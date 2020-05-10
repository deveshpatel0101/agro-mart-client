import React from 'react';
import './MessageListener.css';
import { connect } from 'react-redux';
import { Snackbar } from '@material-ui/core';
import { clearMessages } from '../../redux/actions/message';

class MessageListener extends React.Component {
  handleClose = () => {
    this.props.dispatch(clearMessages());
  };

  render() {
    return (
      <div className='error-message'>
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          open={this.props.message.errorMessage || this.props.message.successMessage ? true : false}
          autoHideDuration={5500}
          onClose={this.handleClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={
            <span id='message-id'>
              {this.props.message.errorMessage || this.props.message.successMessage}
            </span>
          }
          className='snackbar-error-message'
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    message: state.message,
  };
};

export default connect(mapStateToProps)(MessageListener);
