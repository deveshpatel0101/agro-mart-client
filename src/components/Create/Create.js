import React, { Fragment } from 'react';
import './Create.css';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { TextField, Button } from '@material-ui/core';

import MessageSnackBar from '../MessageSnackBar/MessageSnackBar';
import { errorMessage, clearMessages } from '../../redux/actions/message';
import { addBlog, editBlog } from '../../redux/actions/blogs';
import { userLogOut } from '../../redux/actions/auth';
import { createBlog } from '../../controllers/createBlog';
import { editBlogs } from '../../controllers/editBlogs';

class Create extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      blogId: null,
      title: '',
      description: '',
      createdAt: null,
      lastModified: null,
      clicked: false,
      modified: false,
    };
  }

  handleChange = (e) => {
    // sets title and description value in local state depending upon what is changed - title/desciption
    // sets modified to true to use it when blog is in edit mode i.e blog is being modified.
    const { id, value } = e.target;
    if (id === 'title') {
      this.setState({ title: value, modified: true });
    } else if (id === 'description') {
      this.setState({ description: value, modified: true });
    }
  };

  renderMessage(show_msg, main_msg) {
    this.props.dispatch(errorMessage(show_msg, main_msg));
    setTimeout(() => {
      this.props.dispatch(clearMessages());
    }, 8000);
  }

  handleClick = (e) => {
    e.preventDefault();
    const title = e.target.elements.title.value;
    const description = e.target.elements.description.value;

    // check if title and description fields are empty. if so keep submit button disabled.
    // blog is being modified then send api call to server and then dispatch editBlog action only if server responds with status okay
    if (this.state.blogId) {
      // blog is being modified
      const newBlog = {
        title,
        description,
        lastModified: new Date().getTime(),
      };
      // send call to server with necessary values
      editBlogs({ blogId: this.state.blogId, values: { ...newBlog } }).then((res) => {
        // if tokenStatus status in response was invalid dispatch logout action
        const { error, errorType, errorMessage: error_msg } = res;
        if (error && errorType === 'token') {
          this.props.dispatch(userLogOut());
          this.renderMessage(
            'Session Expired! Please login again. Sorry for the inconvenience.',
            error_msg,
          );
        } else if (!error) {
          // if response was true i.e request was successfully satisfied
          this.props.dispatch(editBlog(this.state.blogId, { ...newBlog }));
          this.setState(() => ({ clicked: true }));
        } else if (error) {
          // if error was found in response then send alert to user
          this.renderMessage(
            'Oops! Something went wrong. This might be an API error. Report the error here or try refreshing the page.',
            error_msg,
          );
        }
      });
    } else {
      // new blog is being created, under new state
      const newBlog = {
        title,
        description,
        createdAt: new Date().getTime(),
        lastModified: new Date().getTime(),
      };
      // send call to server with necessary values
      createBlog({ ...newBlog }).then((res) => {
        // if response was true i.e request was successfully satisfied
        const { error, errorType, errorMessage: error_msg, blogId } = res;
        if (!error) {
          this.props.dispatch(addBlog({ ...newBlog, blogId }));
          // set click value to true if form is correctly updated so as to redirect user to home page
          this.setState(() => ({ clicked: true }));
        } else if (error && errorType === 'token') {
          // if tokenStatus status in response was invalid dispatch logout action
          this.props.dispatch(userLogOut());
          this.renderMessage(
            'Session Expired! Please login again. Sorry for the inconvenience.',
            error_msg,
          );
        } else if (error) {
          // if error was found in response then send alert to user
          this.renderMessage(
            'Oops! Something went wrong. This might be an API error. Report the error here or try refreshing the page.',
            error_msg,
          );
        }
      });
    }
  };

  componentWillMount() {
    // find `id` if it exist in url
    const blogId = window.location.search.split('=')[1];
    this.setState(() => ({ blogId }));
    if (blogId) {
      // fetching correctBlog that matches in blogs array
      let correctBlog = this.props.blogs.find((blog) => blog.blogId === blogId && blog);
      if (correctBlog) {
        // if correct blog exist set its values in state along with id
        this.setState(() => ({ ...correctBlog, blogId }));
      } else {
        this.renderMessage('Blog does not exists!', 'Invalid blog id found in url.');
        window.history.replaceState('new url', null, `${window.location.origin}/create`);
      }
    }
  }

  render() {
    return (
      <Fragment>
        {/* if form submitted then click will be true, so `redirect` to home page */}
        {this.state.clicked ? (
          <Redirect push to='/dashboard' />
        ) : (
          <div className='container'>
            <form onSubmit={this.handleClick} onChange={this.handleChange}>
              <div className='title'>
                <TextField
                  id='title'
                  label='Title'
                  type='title'
                  value={this.state.title}
                  margin='normal'
                  fullWidth
                  name='title'
                />
              </div>

              <div className='description'>
                <TextField
                  id='description'
                  label='Description'
                  placeholder='Description of your blog goes here.'
                  multiline={true}
                  fullWidth={true}
                  value={this.state.description}
                  rows={1}
                  rowsMax={15}
                  name='description'
                />
              </div>

              <div className='update-blog'>
                {/* disable the button depending upon the values of title, description and modified */}
                <Button
                  variant='contained'
                  type='submit'
                  size='small'
                  disabled={
                    !(
                      this.state.title !== '' &&
                      this.state.description !== '' &&
                      this.state.modified
                    )
                  }
                >
                  {this.state.blogId ? 'Update Item' : 'Add Item'}
                </Button>
              </div>
            </form>
            {this.props.message.errorMessage && (
              <MessageSnackBar
                show={this.props.message.errorMessage === '' ? false : true}
                message={this.props.message.errorMessage}
              />
            )}
          </div>
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
    message: state.message,
  };
};

export default connect(mapStateToProps)(Create);
