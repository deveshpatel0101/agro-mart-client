export const removeBlogFromDb = (values) => {
  return fetch(
    `https://agro-mart-api.herokuapp.com/user/blogs${
      localStorage.getItem('loginToken') === 'undefined' ||
      localStorage.getItem('loginToken') === 'null'
        ? ''
        : '?token=' + localStorage.getItem('loginToken')
    }`,
    {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
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
