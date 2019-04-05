import React from 'react';
import './Search.css';
import { connect } from 'react-redux';

import SearchItemCard from '../SearchItemCard/SearchItemCard';
import getBlogs from '../../redux/selectors/getBlogs';

class Search extends React.Component {
  render() {
    return (
      <div className='search-results-container'>
        {this.props.blogs.map((blog) => (
          <SearchItemCard blog={blog} key={blog.blogId} />
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    blogs: getBlogs(state.blogs, state.filters),
  };
};

export default connect(mapStateToProps)(Search);
