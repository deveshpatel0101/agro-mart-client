const userReducerDefaultState = {
  auth: false,
  signUpMessage: null,
};

export default (state = userReducerDefaultState, action) => {
  switch (action.type) {
    case 'LOGGED_IN':
      return { ...state, auth: true };
    case 'LOGGED_OUT':
      return { ...state, auth: false };
    case 'SIGNUP_SUCCESS':
      return { ...state, signUpMessage: 'Singup Successfull! You can now login.' };
    case 'REMOVE_SIGNUP':
      return { ...state, signUpMessage: null };
    default:
      return state;
  }
};
