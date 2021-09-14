// Context for LOGIN System

import { createContext, useReducer } from "react";
import Reducer from "./Reducer";

const INITIAL_STATE = {
    user: null,
    isFetching: false,
    isError: false
}

export const Context = createContext(INITIAL_STATE);

export const ContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);

    return (
        <Context.Provider value={{
            user: state.user,
            isFetching: state.isFetching,
            isError: state.isError,
            dispatch
        }}>
            {children} {/* children will be the entire app, as we need the user info almost everywhere */}
        </Context.Provider>
    );
}