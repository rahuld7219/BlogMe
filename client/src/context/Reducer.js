// Reducer for LOGIN System

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
        case "LOGOUT":
            return {
                user: null,
                isfetching: false,
                isError: false
            };
        default:
            return state; // returns the current state
    }
}

export default Reducer;