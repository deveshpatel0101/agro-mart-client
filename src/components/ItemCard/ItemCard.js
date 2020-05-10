import React, { Fragment } from 'react';
import './ItemCard.css';
import { Card, Typography, Button, Modal, Paper, Switch, TextField } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import moment from 'moment';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { sharedItem, removeItem } from '../../redux/actions/items';
import { successMessage, errorMessage } from '../../redux/actions/message';
import { userLogOut } from '../../redux/actions/user';
import { removeItemFromDb } from '../../controllers/removeItem';
import { postSharedItem } from '../../controllers/shared';

class ItemCard extends React.Component {
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
  };

  handleSharedChange = () => {
    let shareItem = {
      itemId: this.props.item.itemId,
      values: {
        shared: !this.props.item.shared,
      },
    };

    postSharedItem(shareItem).then((res) => {
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
      } else {
        this.props.dispatch(sharedItem(this.props.item.itemId));
        this.props.dispatch(successMessage('Successful!', 'Successfully Updated'));
      }
    });
  };

  handleRemoveItem = () => {
    removeItemFromDb({ itemId: this.props.item.itemId }).then((res) => {
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
      } else if (!error) {
        this.props.dispatch(removeItem({ itemId: this.props.item.itemId }));
        this.props.dispatch(successMessage('Item deleted successfully!', 'Item deleted.'));
      }
    });
  };

  render() {
    return (
      <Fragment>
        {/* To redirect user when click event occurs on specific item item in list */}
        {this.state.value ? (
          <Redirect push to={{ pathname: '/create', search: `?id=${this.props.item.itemId}` }} />
        ) : (
          <Card className='items-grid-item'>
            <div className='item-wrapper'>
              <p onClick={this.handleChange} className='item-title'>
                {this.props.item.shared ? (
                  <i className='fal fa-users' />
                ) : (
                  <i className='fal fa-user' />
                )}
                <span>{this.props.item.title}</span>
              </p>
              <p className='item-description' title={this.props.item.description}>
                <b>Description</b>: {this.props.item.description}
              </p>
              {this.props.item.address && (
                <p className='item-address' title={this.props.item.address}>
                  <b>Address</b>: {this.props.item.address}
                </p>
              )}
              <p className='item-datetime'>
                <b>Created</b>:&nbsp;
                <span>{moment(this.props.item.createdAt).format('Do MMM YYYY, hh:mm a')}</span>
              </p>
              <p className='item-datetime'>
                <b>Modified</b>:&nbsp;
                <span>{moment(this.props.item.lastModified).format('Do MMM YYYY, hh:mm a')}</span>
              </p>
              <div className='item-buttons'>
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
                      <Typography variant='subtitle1' id='modal-title'>
                        Share?
                      </Typography>
                      <Switch
                        checked={this.props.item.shared}
                        onChange={this.handleSharedChange}
                        color='primary'
                      />
                      {this.props.item.shared ? (
                        <TextField
                          id='name'
                          value={`${window.location.origin}/public/shared?id=${this.props.item.itemId}`}
                          onClick={this.handleLinkClick}
                        />
                      ) : null}
                      <Typography variant='subtitle1' id='simple-modal-description'>
                        By making it public you understand that it will be available to everyone.
                      </Typography>
                    </Paper>
                  </Modal>
                </div>
                <div className='item-delete-button'>
                  <Button onClick={this.handleRemoveItem} size='small'>
                    Delete <DeleteIcon className='delete-item-icon' />
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

export default connect(mapStateToProps)(ItemCard);
