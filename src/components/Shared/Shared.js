import React, { Fragment } from 'react';
import './Shared.css';
import { Typography, LinearProgress } from '@material-ui/core';

import Header from '../Header/Header';
import { getSharedBlog } from '../../controllers/shared';

class Shared extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      blog: null,
      fetching: true
    }
  }
  componentWillMount() {
    const id = window.location.search.split('=')[1];
    if (id) {
      getSharedBlog(id).then(res => {
        if (res.error === 'does not exist') {
          this.setState(() => ({ error: res.error, fetching: false }));
        } else if (res.error === 'no id found in query') {
          this.setState(() => ({ error: res.error, fetching: false }));
        } else {
          this.setState(() => ({ blog: { ...res.blog }, fetching: false }));
        }
      });
    } else {
      this.setState(() => ({ error: 'no id found in query', fetching: false }));
    }
  }
  render() {
    return (
      <div>
        <Header />
        {this.state.fetching ?
          <LinearProgress /> :
          (
            <div className='shared-blog'>
              {this.state.error === 'does not exist' ?
                (
                  <Typography variant="headline" gutterBottom>
                    Blog does not exist or either it is not shared by the owner or this link is not valid.
                  </Typography>
                ) :
                (this.state.error === 'no id found in query' ?
                  (
                    <Typography variant="headline" gutterBottom>
                      No id found in URL. Server responded with null. Please get a valid link.
                  </Typography>
                  ) :
                  (
                    <Fragment>
                      <div className='shared-title'>
                        <Typography variant="headline" gutterBottom>
                          {this.state.blog.title}
                        </Typography>
                      </div>
                      <div className='shared-description'>
                        <Typography variant="body2" gutterBottom>
                          {this.state.blog.description}
                        </Typography>
                      </div>
                    </Fragment>
                  )
                )}
            </div>
          )
        }

      </div>
    );
  }
}

export default Shared;