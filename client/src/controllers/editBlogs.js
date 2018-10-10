export const editBlogs = (blogs) => {
  return fetch('/user/blogs', {
      method: 'put',
      headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('loginToken')}`
      },
      body: JSON.stringify({ blogs: blogs })
  }).then(res => {
      return res.json().then(result => {
          return result;
      }).then(response => {
          return response;
      });
  });
}