import React from 'react';
import './Dashboard.css';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/Add';

import Filters from '../BlogsFilters/BlogsFilters';
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
          <Button variant='fab' mini={true} color='primary' aria-label='Add Item'>
            <Link to='/create'>
              <ExpandMoreIcon />
            </Link>
          </Button>
        </div>
      </div>
    );
  }
}

export default Dashboard;