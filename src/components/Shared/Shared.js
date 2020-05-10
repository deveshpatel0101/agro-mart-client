import React, { Fragment } from 'react';
import './Shared.css';
import { Typography, LinearProgress } from '@material-ui/core';
import { connect } from 'react-redux';

import Header from '../Header/Header';
import { getSharedItem } from '../../controllers/shared';
import { errorMessage } from '../../redux/actions/message';

class Shared extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: null,
      fetching: true,
      error: false,
    };
  }

  componentDidMount() {
    const id = window.location.search.split('=')[1];
    if (id) {
      getSharedItem(id).then((res) => {
        const { error, errorType, errorMessage: error_msg, item } = res;
        if (error && errorType === 'itemId') {
          this.setState({ error: error, fetching: false });
          this.props.dispatch(errorMessage(error_msg, error_msg));
        } else {
          this.setState({ item: { ...item }, fetching: false });
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
          <div className='shared-item'>
            {this.state.error ? (
              <Typography variant='headline' gutterBottom>
                Uh-Oh! Invalid link.
              </Typography>
            ) : (
              <Fragment>
                <div className='shared-title'>
                  <Typography variant='headline' gutterBottom>
                    Name: {this.state.item.title}
                  </Typography>
                </div>
                <div className='shared-description'>
                  <Typography variant='body2' gutterBottom>
                    Description: {this.state.item.description}
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
