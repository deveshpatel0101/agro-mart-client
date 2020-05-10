export const postSharedItem = (sharedItem) => {
  return fetch(
    `https://agro-mart-api.herokuapp.com/public/shared${
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
      body: JSON.stringify(sharedItem),
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

export const getSharedItem = (itemId) => {
  return fetch(`https://agro-mart-api.herokuapp.com/public/shared/item?itemId=${itemId}`).then((res) => {
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
