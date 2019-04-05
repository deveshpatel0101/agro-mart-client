import React, { Fragment } from 'react';
import './SearchWrapper.css';
import { connect } from 'react-redux';

import Header from '../Header/Header';
import Search from '../Search/Search';
import { addAddress } from '../../redux/actions/blogs';
import { searchBlogsFromDb } from '../../controllers/search';
import { errorMessage, clearMessages } from '../../redux/actions/message';
import { addBlogArr } from '../../redux/actions/blogs';
import getBlogs from '../../redux/selectors/getBlogs';
import secrets from '../../secret';

class SearchWrapper extends React.Component {
  componentDidMount() {
    if (!window.google) {
      searchBlogsFromDb().then((res) => {
        const { error, errorMessage: error_msg, blogs } = res;
        if (error) {
          this.props.dispatch(errorMessage(error_msg, error_msg));
          setTimeout(() => {
            this.props.dispatch(clearMessages());
          }, 8000);
        } else {
          this.props.dispatch(addBlogArr(blogs));
          const that = this;
          loadMap(
            `https://maps.googleapis.com/maps/api/js?libraries=places&key=${
              secrets.GOOGLE_MAPS_API
            }`,
            function(err) {
              if (!err) {
                that.loadAddress();
              }
            },
          );
        }
      });
    } else {
      this.loadAddress();
    }
  }

  loadAddress = () => {
    for (let i = 0; i < this.props.blogs.length; i++) {
      if (this.props.blogs[i].position) {
        const { latitude, longitude } = this.props.blogs[i].position;
        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ location: { lat: latitude, lng: longitude } }, (results, status) => {
          if (status === 'OK') {
            if (results[0]) {
              this.props.dispatch(
                addAddress(results[0].formatted_address, this.props.blogs[i].blogId),
              );
            }
          } else {
            this.props.dispatch(addAddress('Not Available', this.props.blogs[i].blogId));
          }
        });
      } else {
        this.props.dispatch(addAddress('Not Available', this.props.blogs[i].blogId));
      }
    }
  };

  render() {
    return (
      <Fragment>
        <Header />
        {/* search filters here */}
        <Search />
      </Fragment>
    );
  }
}

function loadMap(url, callback) {
  const index = window.document.getElementsByTagName('script')[0];
  const script = document.createElement('script');
  script.src = url;
  script.async = true;
  script.defer = true;
  script.addEventListener('error', function() {
    callback(true);
  });
  script.onload = function() {
    callback(false);
  };
  index.parentNode.insertBefore(script, index);
}

const mapStateToProps = (state) => {
  return {
    blogs: getBlogs(state.blogs, state.filters),
  };
};

export default connect(mapStateToProps)(SearchWrapper);
