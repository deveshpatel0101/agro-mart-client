import { createStore, combineReducers } from 'redux';
import blogsReducer from '../reducers/blogs';
import filtersReducer from '../reducers/filters';
import authReducer from '../reducers/auth';
import messageReducer from '../reducers/message';

export default () => {
    const store = createStore(
        combineReducers({
            blogs: blogsReducer,
            filters: filtersReducer,
            auth: authReducer,
            message: messageReducer
        })
    );
    return store;
}