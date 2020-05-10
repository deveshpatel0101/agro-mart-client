import { createStore, combineReducers } from 'redux';
import itemsReducer from '../reducers/items';
import filtersReducer from '../reducers/filters';
import userReducer from '../reducers/user';
import messageReducer from '../reducers/message';

export default () => {
  const store = createStore(
    combineReducers({
      items: itemsReducer,
      filters: filtersReducer,
      user: userReducer,
      message: messageReducer,
    }),
  );
  return store;
};
