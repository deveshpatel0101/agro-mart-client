export const createBlog = (blogs) => {
  return fetch(
    `https://agro-mart-v2.herokuapp.com/user/blogs${
      localStorage.getItem('loginToken') === 'undefined' ||
      localStorage.getItem('loginToken') === 'null'
        ? ''
        : '?token=' + localStorage.getItem('loginToken')
    }`,
    {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(blogs),
    },
  ).then((res) => {
    return res
      .json()
      .then((result) => {
        return result;
      })
      .then((response) => {
        return response;
      });
  });
};
