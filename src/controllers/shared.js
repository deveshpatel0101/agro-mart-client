export const postSharedBlog = (sharedBlog) => {
  return fetch(
    `https://agro-mart-v2.herokuapp.com/public/shared${
      localStorage.getItem('loginToken') === 'undefined' ||
      localStorage.getItem('loginToken') === 'null'
        ? ''
        : '?token=' + localStorage.getItem('loginToken')
    }`,
    {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sharedBlog),
    },
  ).then((response) => {
    return response
      .json()
      .then((result) => {
        return result;
      })
      .then((res) => {
        return res;
      });
  });
};

export const getSharedBlog = (id) => {
  return fetch(`https://agro-mart-v2.herokuapp.com/public/shared/blog?blogId=${id}`).then((res) => {
    return res
      .json()
      .then((result) => {
        return result;
      })
      .then((finalResult) => {
        return finalResult;
      });
  });
};
