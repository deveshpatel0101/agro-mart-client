import { createStore, combineReducers } from 'redux';
import uuid from 'uuid';

const addBlog = ({ title, description, createdAt = 0, lastModified = 0 } = {}) => ({
    type: 'ADD_BLOG',
    blog: {
        id: uuid(),
        description,
        title,
        createdAt,
        lastModified
    }
});

const removeBlog = ({ id } = {}) => ({
    type: 'REMOVE_BLOG',
    id
});

const editBlog = (id, updates) => ({
    type: 'EDIT_BLOG',
    id,
    updates
});

const blogsReducerDefaultState = [];

const blogsReducer = (state = blogsReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_BLOG':
            return [...state, action.blog];
        case 'REMOVE_BLOG':
            return state.filter(blog => blog.id !== action.id);
        case 'EDIT_BLOG':
            return state.map(blog => blog.id === action.id ? {...blog, ...action.updates } : blog);
        default:
            return state;
    }
};

const setTextFilter = (text = '') => ({
    type: 'SET_TEXT_FILTER',
    text
});

const sortByDate = (date) => ({
    type: 'SET_DATE_FILTER',
    date
});

const setStartDate = (startDate = undefined) => ({
    type: 'SET_START_DATE',
    startDate
});

const setEndDate = (endDate = undefined) => ({
    type: 'SET_END_DATE',
    endDate
});

const filtersReducerDefaultState = {
    text: '',
    sortBy: 'dateUp',
    startDate: undefined,
    endDate: undefined
}

const filtersReducer = (state = filtersReducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_TEXT_FILTER':
            return {...state, text: action.text }
        case 'SET_DATE_FILTER':
            return {...state, sortBy: action.date }
        case 'SET_START_DATE':
            return {...state, startDate: action.startDate }
        case 'SET_END_DATE':
            return {...state, endDate: action.endDate }
        default:
            return state;
    }
};

const getVisibleBlogs = (blogs, { text, sortBy, startDate, endDate }) => {
    return blogs.filter(blog => {
        const startDateMatch = typeof(startDate) !== 'number' || blog.createdAt >= startDate;
        const endDateMatch = typeof(endDate) !== 'number' || blog.createdAt <= endDate;
        const textMatch = (text === '' ? true : (blog.description.toLowerCase().includes(text.toLowerCase()) || blog.title.toLowerCase().includes(text.toLowerCase())));
        return startDateMatch && endDateMatch && textMatch;
    }).sort((a, b) => {
        if (sortBy === 'dateDown') {
            return a.createdAt < b.createdAt ? 1 : -1;
        } else if (sortBy === 'dateUp') {
            return a.createdAt < b.createdAt ? -1 : 1;
        }
    });
}

const store = createStore(
    combineReducers({
        blogs: blogsReducer,
        filters: filtersReducer
    })
);

const unsubscribe = store.subscribe(() => {
    const state = store.getState();
    const visibleBlogs = getVisibleBlogs(state.blogs, state.filters);
    console.log(visibleBlogs);
});


store.dispatch(addBlog({ title: 'My first blog 1', description: 'this is some description of my first blog', createdAt: 1000 }));
store.dispatch(addBlog({ title: 'My second blog', description: 'this is some description of my second blog', createdAt: -1000 }));

// store.dispatch(setStartDate());
// store.dispatch(setEndDate());
// store.dispatch(setTextFilter());

// store.dispatch(removeBlog({ id: blogOne.blog.id }));
// store.dispatch(editBlog(blogTwo.blog.id, { description: 'this is my updated blog' }));
// store.dispatch(setTextFilter('something'));
// store.dispatch(setTextFilter());

// store.dispatch(sortByDate('createdAt'));
// store.dispatch(sortByDate('dateUp'));
// store.dispatch(sortByDate('dateDown'));


const demoState = {
    blogs: [{
        id: 'someRandomId',
        description: 'This is some description about my first blog',
        createdAt: undefined,
        lastModified: undefined,
        title: 'My first Blog'
    }],
    filters: {
        text: 'query string',
        sortBy: 'dateUp/dateDown',
        startDate: undefined,
        endDate: undefined
    }
}