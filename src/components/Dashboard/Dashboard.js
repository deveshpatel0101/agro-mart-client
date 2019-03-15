import React from 'react';
import './Dashboard.css'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/Add';

import Filters from '../BlogsFilters/BlogsFilters'
import Blogs from '../Blogs/Blogs';
import getBlogs from '../../redux/selectors/getBlogs';
import { addAddress } from '../../redux/actions/blogs';
import secrets from '../../secret';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMapReady: false
    }
  }

  componentDidMount() {
    const that = this;
    loadMap(`https://maps.googleapis.com/maps/api/js?libraries=places&key=${secrets.GOOGLE_MAPS_API}`, function (err) {
      if (!err) {
        that.setState({ isMapReady: true });
        that.loadAddress();
      }
    });
  }

  loadAddress = () => {
    for (let i = 0; i < this.props.blogs.length; i++) {
      if (this.props.blogs[i].position) {
        const { latitude, longitude } = this.props.blogs[i].position;
        const geocoder = new window.google.maps.Geocoder;
        geocoder.geocode({ location: { lat: latitude, lng: longitude } }, (results, status) => {
          if (status === 'OK') {
            if (results[0]) {
              this.props.dispatch(addAddress(results[0].formatted_address, this.props.blogs[i].id));
            }
          }
        });
      }
    }
  }

  render() {
    return (
      <div>
        <div></div>
        <div className='container'>
          <Filters />
        </div>
        <Blogs />
        <div className='top-button'>
          <Button onClick={() => (window.scrollTo(0, 0))} variant="fab" mini color="primary" aria-label="Add Item">
            <Link to='/create'><ExpandMoreIcon /></Link>
          </Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    blogs: getBlogs(state.blogs, state.filters),
    message: state.message
  }
}

function loadMap(url, callback) {
  const index = window.document.getElementsByTagName("script")[0];
  const script = document.createElement("script");
  script.src = url;
  script.async = true;
  script.defer = true;
  script.addEventListener('error', function () {
    callback(true);
  });
  script.onload = function () {
    callback(false);
  }
  index.parentNode.insertBefore(script, index);
}

export default connect(mapStateToProps)(Dashboard);