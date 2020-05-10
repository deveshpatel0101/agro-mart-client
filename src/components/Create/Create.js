import React, { Fragment } from 'react';
import './Create.css';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { TextField, Button } from '@material-ui/core';

import { errorMessage } from '../../redux/actions/message';
import { addItem, editItem } from '../../redux/actions/items';
import { userLogOut } from '../../redux/actions/user';
import { createItem } from '../../controllers/createItem';
import { editItems } from '../../controllers/editItems';

class Create extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemId: null,
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
    // sets modified to true to use it when item is in edit mode i.e item is being modified.
    const { id, value } = e.target;
    if (id === 'title') {
      this.setState({ title: value, modified: true });
    } else if (id === 'description') {
      this.setState({ description: value, modified: true });
    }
  };

  renderMessage(show_msg, main_msg) {
    this.props.dispatch(errorMessage(show_msg, main_msg));
  }

  handleClick = (e) => {
    e.preventDefault();
    const title = e.target.elements.title.value;
    const description = e.target.elements.description.value;

    // check if title and description fields are empty. if so keep submit button disabled.
    // item is being modified then send api call to server and then dispatch editItem action only if server responds with status okay
    if (this.state.itemId) {
      // item is being modified
      const newItem = {
        title,
        description,
        lastModified: new Date().getTime(),
      };
      // send call to server with necessary values
      editItems({ itemId: this.state.itemId, values: { ...newItem } }).then((res) => {
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
          this.props.dispatch(editItem(this.state.itemId, { ...newItem }));
          this.setState({ clicked: true });
        } else if (error) {
          // if error was found in response then send alert to user
          this.renderMessage(
            'Oops! Something went wrong. This might be an API error. Report the error here or try refreshing the page.',
            error_msg,
          );
        }
      });
    } else {
      // new item is being created, under new state
      const newItem = {
        title,
        description,
        createdAt: new Date().getTime(),
        lastModified: new Date().getTime(),
      };
      // send call to server with necessary values
      createItem({ ...newItem }).then((res) => {
        // if response was true i.e request was successfully satisfied
        const { error, errorType, errorMessage: error_msg, itemId } = res;
        if (!error) {
          this.props.dispatch(addItem({ ...newItem, itemId }));
          // set click value to true if form is correctly updated so as to redirect user to home page
          this.setState({ clicked: true });
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

  componentDidMount() {
    // find `id` if it exist in url
    const itemId = window.location.search.split('=')[1];
    this.setState({ itemId });
    if (itemId) {
      // fetching correctItem that matches in items array
      let correctItem = this.props.items.find((item) => item.itemId === itemId && item);
      if (correctItem) {
        // if correct item exist set its values in state along with id
        this.setState({ ...correctItem, itemId });
      } else {
        this.renderMessage('Item does not exists!', 'Invalid item id found in url.');
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
                  placeholder='Description of your item goes here.'
                  multiline={true}
                  fullWidth={true}
                  value={this.state.description}
                  rows={1}
                  rowsMax={15}
                  name='description'
                />
              </div>

              <div className='update-item'>
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
                  {this.state.itemId ? 'Update Item' : 'Add Item'}
                </Button>
              </div>
            </form>
          </div>
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    items: state.items,
  };
};

export default connect(mapStateToProps)(Create);
