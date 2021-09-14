// Context for LOGIN System

import { createContext, useEffect, useReducer } from "react";
import Reducer from "./Reducer";

const INITIAL_STATE = {
    user: JSON.parse(localStorage.getItem("user")) || null, //  whenever page refreshes, set the user data to the stored data in local storage, otherwise set null
    isFetching: false,
    isError: false
}

export const Context = createContext(INITIAL_STATE);

export const ContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);

    // whenever state.user changes, update local storage data
    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(state.user));
    }, [state.user]);

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