export const searchBlogsFromDb = (values) => {
  return fetch(`https://agro-mart-v2.herokuapp.com/public/shared`, {
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
