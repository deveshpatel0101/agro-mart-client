export const addBlog = ({ blogId, title, description, createdAt = 0, lastModified = 0 } = {}) => ({
  type: 'ADD_BLOG',
  blog: {
    blogId,
    description,
    title,
    createdAt,
    lastModified,
  },
});

export const removeBlog = ({ blogId } = {}) => ({
  type: 'REMOVE_BLOG',
  blogId,
});

export const editBlog = (blogId, updates) => ({
  type: 'EDIT_BLOG',
  blogId,
  updates,
});

export const addBlogArr = (blogArr) => ({
  type: 'ADD_BLOG_ARR',
  blogs: blogArr,
});

export const sharedBlog = (blogId) => ({
  type: 'SHARED_BLOG',
  blogId,
});

export const addAddress = (address, blogId) => ({
  type: 'ADD_ADDRESS',
  address,
  blogId,
});
