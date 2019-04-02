export const postSignupData = (formData) => {
  return fetch('https://agro-mart-v2.herokuapp.com/user/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  })
    .then((response) => {
      return response.json().then((res) => {
        return res;
      });
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.error(err);
      return err;
    });
};
