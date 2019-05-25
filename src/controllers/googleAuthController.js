export const googleAuthRegister = (data) => {
  return fetch(`https://agro-mart-v2.herokuapp.com/user/auth/google/register`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      return res
        .json()
        .then((result) => {
          return result;
        })
        .then((response) => {
          return response;
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const googleAuthLogin = (data) => {
  return fetch(`https://agro-mart-v2.herokuapp.com/user/auth/google/login`, {
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
