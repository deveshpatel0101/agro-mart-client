export default (blogs, { text, sortBy, startDate, endDate }) => {
  return blogs.filter(blog => {
      const startDateMatch = typeof(startDate) !== 'number' || blog.createdAt >= startDate;
      const endDateMatch = typeof(endDate) !== 'number' || blog.createdAt <= endDate;
      const textMatch = (text === '' ? true :  blog.title.toLowerCase().includes(text.toLowerCase()));
      return startDateMatch && endDateMatch && textMatch;
  }).sort((a, b) => {
      if (sortBy === 'dateCreatedAtDown') {
          return a.createdAt < b.createdAt ? 1 : -1;
      } else if (sortBy === 'dateCreatedAtUp') {
          return a.createdAt < b.createdAt ? -1 : 1;
      } else if (sortBy === 'dateLastModifiedDown') {
          return a.lastModified < b.lastModified ? 1 : -1;
      } else if (sortBy === 'dateLastModifiedUp') {
        return a.lastModified < b.lastModified ? -1 : 1;
    }
      return null;
  });
}