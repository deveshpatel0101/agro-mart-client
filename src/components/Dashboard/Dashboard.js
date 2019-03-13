import React from 'react';
import './Dashboard.css'
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Filters from '../BlogsFilters/BlogsFilters'
import Blogs from '../Blogs/Blogs';

class Dashboard extends React.Component {
  render() {
    return (
      <div>
        <div className='container'>
          <Filters />
        </div>
        <Blogs />
        <div className='top-button'>
          <Button onClick={() => (window.scrollTo(0, 0))} variant="fab" mini color="primary" aria-label="Go to top">
            <ExpandMoreIcon />
          </Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    message: state.message
  }
}

export default connect(mapStateToProps)(Dashboard);