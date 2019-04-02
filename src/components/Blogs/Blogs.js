import React, { Fragment } from 'react';
import './Blogs.css';
import { connect } from 'react-redux';

import BlogCard from '../BlogCard/BlogCard';
import getBlogs from '../../redux/selectors/getBlogs';

class Blogs extends React.Component {
  render() {
    return (
      <Fragment>
        {/* Only to show table if there is atleast one blog in list */}
        {this.props.blogs.length > 0 ? (
          <div className='items-grid'>
            {this.props.blogs.map((blog) =>
              blog.blogId ? (
                <BlogCard key={blog.blogId} blog={blog} />
              ) : (
                <BlogCard key={blog.id} blog={blog} />
              ),
            )}
          </div>
        ) : null}
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    blogs: getBlogs(state.blogs, state.filters),
  };
};

export default connect(mapStateToProps)(Blogs);
