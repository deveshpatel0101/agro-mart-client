import React from 'react';
import './Dashboard.css'

import Filters from '../BlogsFilters/BlogsFilters'
import Blogs from '../Blogs/Blogs';

class Dashboard extends React.Component {
  render() {
    return (
      <div className='container'>
        <Filters />
        <Blogs />
      </div>
    );
  }
}

export default Dashboard;