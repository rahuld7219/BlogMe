// Reducer for user System

const Reducer = (state, action) => {
    switch (action.type) {
        case "LOGIN_START":
            return {
                user: null,
                isFetching: true,
                isError: false
            };
        case "LOGIN_SUCCESS":
            return {
                user: action.payload, // payload have the user info
                isFetching: false,
                isError: false
            };
        case "LOGIN_FAILURE":
            return {
                user: null,
                isFetching: false,
                isError: true
            };
        case "UPDATE_START":
            return {
                ...state, // isError and user data remains same
                isFetching: true,
            };
        case "UPDATE_SUCCESS":
            return {
                user: {...action.payload, accessToken: state.user.accessToken/*, refreshToken: state.user.refreshToken*/}, // payload have the user info
                isFetching: false,
                isError: false
            };
        case "UPDATE_FAILURE":
            return {
                user: state.user, // user data remains same
                isFetching: false,
                isError: true
            };
        case "LOGOUT":
            return {
                user: null,
                isfetching: false,
                isError: false
            };
        // case "RENEW_TOKENS":
        //     return {
        //         ...state,
        //         user: {...state.user, accessToken: action.payload.accessToken, refreshToken: action.payload.refreshToken}
        //     };
        default:
            return state; // returns the current state
    }
}

export default Reducer;