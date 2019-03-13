const authReducerDefaultState = {
    loggedIn: false,
    loggedOut: true,
    signUpMessage: null
}

export default (state = authReducerDefaultState, action) => {
    switch (action.type) {
        case 'LOGGED_IN':
            return {...state, loggedIn: true, loggedOut: false };
        case 'LOGGED_OUT':
            return {...state, loggedIn: false, loggedOut: true };
        case 'SIGNUP_SUCCESS':
            return {...state, signUpMessage: 'Singup Successfull! You can now login.' };
        case 'REMOVE_SIGNUP':
            return {...state, signUpMessage: null }
        default:
            return state;
    }
}