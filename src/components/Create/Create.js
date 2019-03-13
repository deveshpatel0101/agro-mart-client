import React, { Fragment } from 'react';
import './Create.css';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { TextField, Button } from '@material-ui/core';

import MessageSnackBar from '../MessageSnackBar/MessageSnackBar';
import { errorMessage, clearMessages } from '../../redux/actions/message';
import { addBlog, editBlog } from '../../redux/actions/blogs';
import { userLogOut } from '../../redux/actions/auth';
import { updateBlogs } from '../../controllers/updateBlogs';
import { editBlogs } from '../../controllers/editBlogs';

class Create extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      title: '',
      description: '',
      createdAt: null,
      lastModified: null,
      clicked: false,
      modified: false
    }
  }

  handleChange = (e) => {
    // sets title and description value in local state depending upon what is changed - title/desciption
    // sets modified to true to use it when blog is in edit mode i.e blog is being modified.
    const temp = e.target.value;
    if (e.target.id === 'title') this.setState(() => ({ title: temp, modified: true }));
    else if (e.target.id === 'description') this.setState(() => ({ description: temp, modified: true }));
  }

  handleClick = (e) => {
    e.preventDefault();
    const title = e.target.elements.title.value;
    const description = e.target.elements.description.value;

    //check if title and description fields are empty. if so keep submit button disabled.
    if (title !== '' && description !== '') { // blog is being modified then send api call to server and then dispatch editBlog action only if server responds with status okay
      if (this.state.id) { // blog is being modified
        let newBlog = editBlog(this.state.id, { title, description, lastModified: new Date().getTime() });
        // send call to server with necessary values
        editBlogs({ id: newBlog.id, ...newBlog.updates }).then(res => {
          // if tokenStatus status in response was invalid dispatch logout action
          if (res.tokenStatus === 'invalid') {
            this.props.dispatch(userLogOut());
          } else if (res.updated) { // if response was true i.e request was successfully satisfied
            this.props.dispatch(newBlog);
            this.setState(() => ({ clicked: true }));
          } else if (res.error) { // if error was found in response then send alert to user
            this.props.dispatch(errorMessage('Oops! Something went wrong. This might be an API error. Report the error here or try refreshing the page.', res.error));
            setTimeout(() => {
              this.props.dispatch(clearMessages());
            }, 8000);
          }
        });
      } else { // new blog is being created, under new state
        let newBlog = addBlog({ title, description, createdAt: new Date().getTime(), lastModified: new Date().getTime() });
        // send call to server with necessary values
        updateBlogs(newBlog.blog).then(res => {
          // if response was true i.e request was successfully satisfied
          if (res.updated) {
            this.props.dispatch(newBlog);
            // set click value to true if form is correctly updated so as to redirect user to home page
            this.setState(() => ({ clicked: true }));
          } else if (res.tokenStatus === 'invalid') { // if tokenStatus status in response was invalid dispatch logout action
            this.props.dispatch(userLogOut());
          } else if (res.error) { // if error was found in response then send alert to user
            this.props.dispatch(errorMessage('Oops! Something went wrong. This might be an API error. Report the error here or try refreshing the page.', res.error));
            setTimeout(() => {
              this.props.dispatch(clearMessages());
            }, 8000);
          }
        });
      }
    }
  }

  componentWillMount() {
    // find `id` if it exist in url
    const id = window.location.search.split('=')[1];
    this.setState(() => ({ id: (id ? id : '') }));
    if (id) {
      let correctBlog;
      // fetching correctBlog that matches in blogs array
      this.props.blogs.map((blog) => {
        if (blog.id === id && blog) {
          correctBlog = blog;
        }
        return null;
      });
      if (correctBlog) { // if correct blog exist set its values in state along with id 
        this.setState(() => ({ ...correctBlog, id }));
      } else {
        this.props.dispatch(errorMessage('Blog does not exists!', 'Invalid blog id found in url.'));
        window.history.replaceState('new url', null, `${window.location.origin}/create`);
        setTimeout(() => {
          this.props.dispatch(clearMessages());
        }, 8000);
      }
    }
  }

  render() {
    return (
      <Fragment>

        {/* if form submitted then click will be true, so `redirect` to home page*/}
        {this.state.clicked ?
          (
            <Redirect push to='/dashboard' />
          ) :
          (
            <div className='container'>
              <form onSubmit={this.handleClick} onChange={this.handleChange}>
                <div className='title'>
                  <TextField
                    id="title"
                    label="Title"
                    type="title"
                    value={this.state.title}
                    margin="normal"
                    fullWidth
                    name='title'
                  />
                </div>
                <div className='description'>
                  <TextField
                    id='description'
                    label="Description"
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
                  <Button variant="contained" type='submit' size="small" disabled={!(this.state.title !== '' && this.state.description !== '' && this.state.modified)}>
                    {this.state.id ? 'Update Blog' : 'Add Blog'}
                  </Button>
                </div>
              </form>
              {this.props.message.errorMessage &&
                <MessageSnackBar
                  show={this.props.message.errorMessage === '' ? false : true}
                  message={this.props.message.errorMessage}
                />
              }
            </div>
          )}
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
    message: state.message
  }
}

export default connect(mapStateToProps)(Create);