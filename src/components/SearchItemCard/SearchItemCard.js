import React from 'react';
import './SearchItemCard.css';

class SearchItemCard extends React.Component {
  render() {
    return (
      <div>
        Title: {this.props.item.title}
        <br />
        Description: {this.props.item.description}<br />
        Address: {this.props.item.address}<br /><br />
      </div>
    );
  }
}

export default SearchItemCard;
