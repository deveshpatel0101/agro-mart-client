import uuid from 'uuid';

export const addBlog = ({ title, description, createdAt = 0, lastModified = 0 } = {}) => ({
    type: 'ADD_BLOG',
    blog: {
        id: uuid(),
        description,
        title,
        createdAt,
        lastModified
    }
});

export const removeBlog = ({ id } = {}) => ({
    type: 'REMOVE_BLOG',
    id
});

export const editBlog = (id, updates) => ({
    type: 'EDIT_BLOG',
    id,
    updates
});

export const addBlogArr = (blogArr) => ({
    type: 'ADD_BLOG_ARR',
    blogs: blogArr
});

export const sharedBlog = (id) => ({
    type: 'SHARED_BLOG',
    id
});

export const addAddress = (address, id) => ({
    type: 'ADD_ADDRESS',
    address,
    id
});