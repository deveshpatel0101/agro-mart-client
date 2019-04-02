import React from 'react';
import './Error404.css';
import Button from '@material-ui/core/Button';

class Error404 extends React.Component {
  render() {
    return (
      <div className='main-error-container'>
        <div className='error-container'>
          <p>
            <span>Error 404!</span> Page Not Found!
          </p>
          <p>
            <span>Sorry!</span> Something doesn't seem quite right. Report this problem here.
          </p>
          <div onClick={() => window.history.back()}>
            <Button color='secondary'>Go Back here</Button>
          </div>
        </div>
      </div>
    );
  }
}

export default Error404;
