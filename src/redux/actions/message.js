export const errorMessage = (errorMessage, err) => ({
  type: 'ERROR_MESSAGE',
  errorMessage,
  error: err,
});

export const successMessage = (successMessage) => ({
  type: 'SUCCESS_MESSAGE',
  successMessage,
});

export const clearMessages = () => ({
  type: 'CLEAR_ALL',
});
