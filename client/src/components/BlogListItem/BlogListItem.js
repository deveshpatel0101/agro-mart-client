import React, { Fragment } from 'react';
import './BlogListItem.css';
import { TableRow, TableCell, Switch, Typography, Modal, Button, Paper, TextField } from '@material-ui/core';
import moment from 'moment';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { sharedBlog, removeBlog } from '../../redux/actions/blogs';
import { userLogOut } from '../../redux/actions/auth';
import { removeBlogFromDb } from '../../controllers/removeBlog';
import { postSharedBlog } from '../../controllers/shared';

class BlogListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: false,
      shared: false,
      copied: false,
      open: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSharedChange = this.handleSharedChange.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleLinkClick = this.handleLinkClick.bind(this);
    this.handleRemoveBlog = this.handleRemoveBlog.bind(this);
  }

  handleChange(e) {
    this.setState(() => ({ value: true }));
  }

  handleOpen() {
    this.setState(() => ({ open: true }));
  }

  handleClose() {
    this.setState(() => ({ open: false }));
  }

  handleLinkClick(e) {
    e.target.select();
  }

  handleSharedChange(e) {
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

  handleRemoveBlog(e) {
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
            <TableRow>
              <TableCell onClick={this.handleChange} title={this.props.blog.shared ? 'shared' : 'private'}>
                {this.props.blog.shared ? <i className="fal fa-users"></i> : <i className="fal fa-user"></i>}
                &nbsp;&nbsp;{this.props.blog.title}
              </TableCell>
              <TableCell>{moment(this.props.blog.createdAt).format('Do MMM YYYY, hh:mm a')}</TableCell>
              <TableCell>{moment(this.props.blog.lastModified).format('Do MMM YYYY, hh:mm a')}</TableCell>
              <TableCell>
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
              </TableCell>
              <TableCell>
                <Button onClick={this.handleRemoveBlog} size='small'>Delete</Button>
              </TableCell>
            </TableRow>
          )
        }
      </Fragment>
    );
  }
}

const mapStateToProps = () => {
  return {};
}

export default connect(mapStateToProps)(BlogListItem);