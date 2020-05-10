import React, { Fragment } from 'react';
import './Items.css';
import { connect } from 'react-redux';

import ItemCard from '../ItemCard/ItemCard';
import getItems from '../../redux/selectors/getItems';

class Items extends React.Component {
  render() {
    return (
      <Fragment>
        {/* Only to show table if there is atleast one item in list */}
        {this.props.items.length > 0 ? (
          <div className='items-grid'>
            {this.props.items.map((item) => (
              <ItemCard key={item.itemId} item={item} />
            ))}
          </div>
        ) : null}
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    items: getItems(state.items, state.filters),
  };
};

export default connect(mapStateToProps)(Items);
