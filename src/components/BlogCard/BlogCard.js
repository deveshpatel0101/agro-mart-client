import React, { Fragment } from 'react';
import './BlogCard.css';
import { Card, Typography, Button, Modal, Paper, Switch, TextField } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import moment from 'moment';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { sharedBlog, removeBlog } from '../../redux/actions/blogs';
import { successMessage, clearMessages, errorMessage } from '../../redux/actions/message';
import { userLogOut } from '../../redux/actions/auth';
import { removeBlogFromDb } from '../../controllers/removeBlog';
import { postSharedBlog } from '../../controllers/shared';

class BlogCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: false,
      shared: false,
      copied: false,
      open: false,
    };
  }

  handleChange = () => {
    this.setState({ value: true });
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleLinkClick = (e) => {
    e.target.select();
    document.execCommand('copy');
    this.props.dispatch(successMessage('Link copied to clipboard.', 'Link copied to clipboard.'));
    setTimeout(() => {
      this.props.dispatch(clearMessages());
    }, 8000);
  };

  handleSharedChange = () => {
    let shareBlog = {
      blogId: this.props.blog.blogId,
      values: {
        shared: !this.props.blog.shared,
      },
    };

    postSharedBlog(shareBlog).then((res) => {
      const { error, errorType, errorMessage: error_msg } = res;
      if (error && errorType === 'token') {
        this.props.dispatch(userLogOut());
      } else if (error) {
        // if error was found in response then send alert to user
        this.props.dispatch(
          errorMessage(
            'Oops! Something went wrong. This might be an API error. Report the error here or try refreshing the page.',
            error_msg,
          ),
        );
        setTimeout(() => {
          this.props.dispatch(clearMessages());
        }, 8000);
      } else {
        this.props.dispatch(sharedBlog(this.props.blog.blogId));
        this.props.dispatch(successMessage('Successful!', 'Successfully Updated'));
        setTimeout(() => {
          this.props.dispatch(clearMessages());
        }, 5000);
      }
    });
  };

  handleRemoveBlog = () => {
    removeBlogFromDb({ blogId: this.props.blog.blogId }).then((res) => {
      const { error, errorType, errorMessage: error_msg } = res;
      if (error && errorType === 'token') {
        this.props.dispatch(userLogOut());
      } else if (error) {
        this.props.dispatch(
          errorMessage(
            'Oops! Something went wrong. This might be an API error. Report the error here or try refreshing the page.',
            error_msg,
          ),
        );
        setTimeout(() => {
          this.props.dispatch(clearMessages());
        }, 8000);
      } else if (!error) {
        this.props.dispatch(removeBlog({ blogId: this.props.blog.blogId }));
        this.props.dispatch(successMessage('Item deleted successfully!', 'Item deleted.'));
        setTimeout(() => {
          this.props.dispatch(clearMessages());
        }, 8000);
      }
    });
  };

  render() {
    return (
      <Fragment>
        {/* To redirect user when click event occurs on specific blog item in list */}
        {this.state.value ? (
          <Redirect push to={{ pathname: '/create', search: `?id=${this.props.blog.blogId}` }} />
        ) : (
          <Card className='items-grid-item'>
            <div className='blog-wrapper'>
              <p onClick={this.handleChange} className='blog-title'>
                {this.props.blog.shared ? (
                  <i className='fal fa-users' />
                ) : (
                  <i className='fal fa-user' />
                )}
                <span>{this.props.blog.title}</span>
              </p>
              <p className='blog-description' title={this.props.blog.description}>
                <b>Description</b>: {this.props.blog.description}
              </p>
              {this.props.blog.address && (
                <p className='blog-address' title={this.props.blog.address}>
                  <b>Address</b>: {this.props.blog.address}
                </p>
              )}
              <p className='blog-datetime'>
                <b>Created</b>:&nbsp;
                <span>{moment(this.props.blog.createdAt).format('Do MMM YYYY, hh:mm a')}</span>
              </p>
              <p className='blog-datetime'>
                <b>Modified</b>:&nbsp;
                <span>{moment(this.props.blog.lastModified).format('Do MMM YYYY, hh:mm a')}</span>
              </p>
              <div className='blog-buttons'>
                <div className='modal-open-button'>
                  <Button onClick={this.handleOpen} size='small'>
                    Share
                  </Button>
                  <Modal
                    aria-labelledby='simple-modal-title'
                    aria-describedby='simple-modal-description'
                    open={this.state.open}
                    onClose={this.handleClose}
                    className='modal'
                  >
                    <Paper className='modal-content'>
                      <Typography variant='title' id='modal-title'>
                        Share?
                      </Typography>
                      <Switch
                        checked={this.props.blog.shared}
                        onChange={this.handleSharedChange}
                        color='primary'
                      />
                      {this.props.blog.shared ? (
                        <TextField
                          id='name'
                          value={`${window.location.origin}/public/shared?id=${this.props.blog.blogId}`}
                          onClick={this.handleLinkClick}
                        />
                      ) : null}
                      <Typography variant='subheading' id='simple-modal-description'>
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
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = () => {
  return {};
};

export default connect(mapStateToProps)(BlogCard);
