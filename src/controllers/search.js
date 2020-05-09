export const searchBlogsFromDb = (values) => {
  return fetch(`https://agro-mart-api.herokuapp.com/public/shared`, {
    method: 'get',
  }).then((res) => {
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
