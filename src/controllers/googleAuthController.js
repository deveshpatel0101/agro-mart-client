export const googleAuth = (data) => {
  return fetch(`https://agro-mart-v2.herokuapp.com/user/auth/google`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
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
