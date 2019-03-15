import React, { Fragment } from 'react';
import './BlogListItem.css';
import { Card, Typography, Button, Modal, Paper, Switch, TextField } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import moment from 'moment';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import MessageSnackBar from '../MessageSnackBar/MessageSnackBar';
import { sharedBlog, removeBlog } from '../../redux/actions/blogs';
import { successMessage, clearMessages } from '../../redux/actions/message';
import { userLogOut } from '../../redux/actions/auth';
import { removeBlogFromDb } from '../../controllers/removeBlog';
import { postSharedBlog } from '../../controllers/shared';

// TODO: redirect to login and bring user back to where he was
// Remove the bug of fontawesome icons not being loaded
class BlogListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: false,
      shared: false,
      copied: false,
      open: false
    }
  }

  handleChange = () => {
    this.setState(() => ({ value: true }));
  }

  handleOpen = () => {
    this.setState(() => ({ open: true }));
  }

  handleClose = () => {
    this.setState(() => ({ open: false }));
  }

  handleLinkClick = (e) => {
    e.target.select();
    document.execCommand('copy');
    this.props.dispatch(successMessage('Link copied to clipboard.', 'link copied to clipboard.'))
    setTimeout(() => {
      this.props.dispatch(clearMessages());
    }, 8000);
  }

  handleSharedChange = () => {
    let shareBlog = {
      blogId: this.props.blog.id,
      title: this.props.blog.title,
      description: this.props.blog.description,
      createdAt: this.props.blog.createdAt,
      lastModified: this.props.blog.lastModified,
      shared: !(this.props.blog.shared)
    }

    postSharedBlog(shareBlog).then(res => {
      if (res.error) {
        alert('Something went wrong please try again after sometime.');
      } else if (res.tokenStatus) {
        this.props.dispatch(userLogOut());
      } else {
        this.props.dispatch(sharedBlog(this.props.blog.id));
      }
    });
  }

  handleRemoveBlog = () => {
    removeBlogFromDb(this.props.blog.id).then(res => {
      if (res.tokenStatus) {
        this.props.dispatch(userLogOut());
      } else if (res.error) {
        alert('Something went wrong. Please try again later');
      } else if (res.message === 'successful') {
        this.props.dispatch(removeBlog({ id: this.props.blog.id }));
      }
    });
  }

  render() {
    return (
      <Fragment>
        {/* To redirect user when click event occurs on specific blog item in list */}
        {this.state.value ?
          (
            <Redirect push to={{ pathname: '/create', search: `?id=${this.props.blog.id}` }} />
          ) :
          (
            <Card className='items-grid-item'>
              <div className='blog-wrapper'>
                <p onClick={this.handleChange} className='blog-title'>
                  {this.props.blog.shared ? <i className="fal fa-users"></i> : <i className="fal fa-user"></i>}
                  <span>{this.props.blog.title}</span>
                </p>
                <p className='blog-description'>Description: {this.props.blog.description}</p>
                <p className='blog-datetime'>
                  Created At: <span>{moment(this.props.blog.createdAt).format('Do MMM YYYY, hh:mm a')}</span>
                </p>
                <p className='blog-datetime'>
                  Modified On: <span>{moment(this.props.blog.lastModified).format('Do MMM YYYY, hh:mm a')}</span>
                </p>
                <div className='blog-buttons'>
                  <div className='modal-open-button'>
                    <Button onClick={this.handleOpen} size='small'>Share</Button>
                    <Modal
                      aria-labelledby="simple-modal-title"
                      aria-describedby="simple-modal-description"
                      open={this.state.open}
                      onClose={this.handleClose}
                      className='modal'
                    >
                      <Paper className='modal-content'>
                        <Typography variant="title" id="modal-title">
                          Share?
                        </Typography>
                        <Switch
                          checked={this.props.blog.shared}
                          onChange={this.handleSharedChange}
                          color="primary"
                        />
                        {this.props.blog.shared ?
                          (
                            <TextField
                              id="name"
                              value={`${window.location.origin}/public/shared?id=${this.props.blog.id}`}
                              onClick={this.handleLinkClick}
                            />
                          ) :
                          null
                        }
                        <Typography variant="subheading" id="simple-modal-description">
                          By making it public you understand that it will be available to everyone.
                        </Typography>
                      </Paper>
                    </Modal>
                  </div>
                  <div className='blog-delete-button'>
                    <Button onClick={this.handleRemoveBlog} size='small'>
                      Delete <DeleteIcon className='delete-blog-icon' />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          )
        }
        <div >
          {this.props.message.successMessage &&
            <MessageSnackBar
              show={this.props.message.successMessage === '' ? false : true}
              message={this.props.message.successMessage}
            />
          }
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    message: state.message
  };
}

export default connect(mapStateToProps)(BlogListItem);