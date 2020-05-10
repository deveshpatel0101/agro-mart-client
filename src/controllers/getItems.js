export const getItemsFromDb = () => {
  return fetch(
    `https://agro-mart-api.herokuapp.com/user/items${
      localStorage.getItem('loginToken') === 'undefined' ||
      localStorage.getItem('loginToken') === 'null'
        ? ''
        : '?token=' + localStorage.getItem('loginToken')
    }`,
    {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
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
