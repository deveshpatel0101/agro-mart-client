const blogsReducerDefaultState = [];

export default (state = blogsReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_BLOG':
            return [...state, action.blog];
        case 'REMOVE_BLOG':
            return state.filter(blog => blog.id !== action.id);
        case 'EDIT_BLOG':
            return state.map(blog => blog.id === action.id ? {...blog, ...action.updates } : blog);
        case 'ADD_BLOG_ARR':
            return action.blogs;
        case 'SHARED_BLOG': 
            return state.map(blog => blog.id === action.id ? {...blog, shared: !blog.shared} : blog);
        default:
            return state;
    }
};