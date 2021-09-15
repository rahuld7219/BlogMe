import "./login.css";
import { Link } from "react-router-dom";
import { useContext, useRef } from "react";
import axios from "axios";
import { Context } from "../../../context/Context";
import { LoginStart, LoginSuccess, LoginFailure } from "../../../context/Actions";

export default function Login() {
    const usernameRef = useRef(); // we could use useState and onChange attribute instead of ref
    const passwordRef = useRef();

    const { dispatch, isFetching } = useContext(Context);

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(LoginStart()); // can write dispatch({ type: LOGIN_START }) directly
        try {
            const res = await axios.post("/auth/login", {
                username: usernameRef.current.value,
                password: passwordRef.current.value
            });
            dispatch(LoginSuccess(res.data)); // can write dispatch({ type: LOGIN_SUCCESS, payload: res.data }) directly
        } catch (err) {
            dispatch(LoginFailure()); // can write dispatch({ type: LOGIN_FAILURE }) directly
        }
    }

    return (
        <div className="login">
            <span className="loginTitle">Login</span>
            <form className="loginForm" onSubmit={handleSubmit}>
                <label htmlFor="username">Username</label>
                <input
                    className="loginInput"
                    id="username"
                    type="text"
                    placeholder="Enter your username..."
                    ref={usernameRef}
                    required
                />
                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    className="loginInput"
                    type="password"
                    placeholder="Enter your password..."
                    ref={passwordRef}
                    required
                />
                <button className="loginButton" type="submit" disabled={isFetching}>Login</button>
            </form>
            <button className="loginRegisterButton">
                <Link className="link" to="/register">Register</Link>
            </button>
        </div>
    );
}