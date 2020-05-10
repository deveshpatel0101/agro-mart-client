import React from 'react';
import './Search.css';
import { connect } from 'react-redux';

import Header from '../Header/Header';
import SearchItemCard from '../SearchItemCard/SearchItemCard';
import { addAddress } from '../../redux/actions/items';
import { searchItemsFromDb } from '../../controllers/search';
import { errorMessage } from '../../redux/actions/message';
import { addItemsArr } from '../../redux/actions/items';
import getItems from '../../redux/selectors/getItems';
import secrets from '../../secret';

class Search extends React.Component {
  componentDidMount() {
    if (!window.google) {
      searchItemsFromDb().then((res) => {
        const { error, errorMessage: error_msg, items } = res;
        if (error) {
          this.props.dispatch(errorMessage(error_msg, error_msg));
        } else {
          this.props.dispatch(addItemsArr(items));
          const that = this;
          loadMap(
            `https://maps.googleapis.com/maps/api/js?libraries=places&key=${secrets.GOOGLE_MAPS_API}`,
            function (err) {
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
    for (let i = 0; i < this.props.items.length; i++) {
      if (this.props.items[i].position) {
        const { latitude, longitude } = this.props.items[i].position;
        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ location: { lat: latitude, lng: longitude } }, (results, status) => {
          if (status === 'OK') {
            if (results[0]) {
              this.props.dispatch(
                addAddress(results[0].formatted_address, this.props.items[i].itemId),
              );
            }
          } else {
            this.props.dispatch(addAddress('Not Available', this.props.items[i].itemId));
          }
        });
      } else {
        this.props.dispatch(addAddress('Not Available', this.props.items[i].itemId));
      }
    }
  };

  render() {
    return (
      <React.Fragment>
        <Header />
        <div className='search-results-container'>
          {this.props.items.map((item) => (
            <SearchItemCard item={item} key={item.itemId} />
          ))}
        </div>
      </React.Fragment>
    );
  }
}

function loadMap(url, callback) {
  const index = window.document.getElementsByTagName('script')[0];
  const script = document.createElement('script');
  script.src = url;
  script.async = true;
  script.defer = true;
  script.addEventListener('error', function () {
    callback(true);
  });
  script.onload = function () {
    callback(false);
  };
  index.parentNode.insertBefore(script, index);
}

const mapStateToProps = (state) => {
  return {
    items: getItems(state.items, state.filters),
  };
};

export default connect(mapStateToProps)(Search);
