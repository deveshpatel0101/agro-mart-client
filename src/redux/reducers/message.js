const messageReducerDefaultState = {
  successMessage: null,
  errorMessage: null,
  error: null,
};

export default (state = messageReducerDefaultState, action) => {
  switch (action.type) {
    case 'SUCCESS_MESSAGE':
      return { ...state, successMessage: action.successMessage };
    case 'ERROR_MESSAGE':
      return { ...state, errorMessage: action.errorMessage, error: action.error };
    case 'CLEAR_ALL':
      return { ...state, errorMessage: null, successMessage: null, error: null };
    default:
      return state;
  }
};
