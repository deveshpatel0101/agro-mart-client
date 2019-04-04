import React from 'react';
import './MessageListener.css';
import { connect } from 'react-redux';

import MessageSnackBar from '../MessageSnackBar/MessageSnackBar';

class MessageListener extends React.Component {
  render() {
    return (
      <MessageSnackBar
        show={this.props.message.errorMessage || this.props.message.successMessage ? true : false}
        message={this.props.message.errorMessage || this.props.message.successMessage}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    message: state.message,
  };
};

export default connect(mapStateToProps)(MessageListener);
