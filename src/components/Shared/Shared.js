import React, { Fragment } from 'react';
import './Shared.css';
import { Typography, LinearProgress } from '@material-ui/core';
import { connect } from 'react-redux';

import Header from '../Header/Header';
import { getSharedBlog } from '../../controllers/shared';
import { errorMessage, clearMessages } from '../../redux/actions/message';

class Shared extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      blog: null,
      fetching: true,
      error: false,
    };
  }
  componentWillMount() {
    const id = window.location.search.split('=')[1];
    if (id) {
      getSharedBlog(id).then((res) => {
        const { error, errorType, errorMessage: error_msg, blog } = res;
        if (error && errorType === 'blogId') {
          this.setState({ error: error, fetching: false });
          this.props.dispatch(errorMessage(error_msg, error_msg));
          setTimeout(() => {
            this.props.dispatch(clearMessages());
          }, 8000);
        } else {
          this.setState({ blog: { ...blog }, fetching: false });
        }
      });
    } else {
      this.setState({ error: 'no id found in query', fetching: false });
    }
  }
  render() {
    return (
      <div>
        <Header />
        {this.state.fetching ? (
          <LinearProgress />
        ) : (
          <div className='shared-blog'>
            {this.state.error ? (
              <Typography variant='headline' gutterBottom>
                Uh-Oh! Invalid link.
              </Typography>
            ) : (
              <Fragment>
                <div className='shared-title'>
                  <Typography variant='headline' gutterBottom>
                    Name: {this.state.blog.title}
                  </Typography>
                </div>
                <div className='shared-description'>
                  <Typography variant='body2' gutterBottom>
                    Description: {this.state.blog.description}
                  </Typography>
                </div>
              </Fragment>
            )}
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = () => {
  return {};
};

export default connect(mapStateToProps)(Shared);
