import React from 'react';
import './SearchItemCard.css';

class SearchItemCard extends React.Component {
  render() {
    return (
      <div>
        Title: {this.props.blog.title}
        <br />
        Description: {this.props.blog.description}<br />
        Address: {this.props.blog.address}<br /><br />
      </div>
    );
  }
}

export default SearchItemCard;
