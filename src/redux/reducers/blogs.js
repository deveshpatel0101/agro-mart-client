const blogsReducerDefaultState = [];

export default (state = blogsReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_BLOG':
            return [...state, action.blog];
        case 'REMOVE_BLOG':
            return state.filter(blog => blog.blogId !== action.blogId);
        case 'EDIT_BLOG':
            return state.map(blog => blog.blogId === action.blogId ? {...blog, ...action.updates } : blog);
        case 'ADD_BLOG_ARR':
            return action.blogs;
        case 'SHARED_BLOG':
            return state.map(blog => blog.blogId === action.blogId ? {...blog, shared: !blog.shared } : blog);
        case 'ADD_ADDRESS':
            return state.map(blog => blog.blogId === action.blogId ? {...blog, address: action.address } : blog);
        default:
            return state;
    }
};