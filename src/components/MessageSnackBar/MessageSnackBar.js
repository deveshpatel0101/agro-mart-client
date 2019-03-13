import React from 'react';
import './MessageSnackBar.css';
import { Snackbar } from '@material-ui/core';

class MessageSnackBar extends React.Component {
  render() {
    return (
      <div>
        <div className='error-message'>
          <Snackbar
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            open={this.props.show}
            ContentProps={{
              'aria-describedby': 'message-id',
            }}
            message={<span id="message-id">{this.props.message}</span>}
            className='snackbar-error-message'
          />
        </div>
      </div>
    )
  }
}

export default MessageSnackBar;