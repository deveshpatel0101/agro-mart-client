import React from 'react';
import './Dashboard.css';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/Add';

import Filters from '../ItemsFilters/ItemsFilters';
import Items from '../Items/Items';

class Dashboard extends React.Component {
  render() {
    return (
      <div>
        <div className='container'>
          <Filters />
        </div>
        <Items />
        <div className='top-button'>
          <Link to='/create'>
            <Button variant='contained' size='small' color='primary' aria-label='Add Item'>
              <ExpandMoreIcon />
            </Button>
          </Link>
        </div>
      </div>
    );
  }
}

export default Dashboard;
