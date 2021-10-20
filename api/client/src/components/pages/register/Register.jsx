import "./register.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import axiosInstance from "../../../../src/config";

export default function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(false);
        try {
        const res = await axiosInstance.post("/auth/register", { username, email, password });
        res.data && window.location.replace("/login")
        } catch(err) {
            setError(true);
        }
    }

    return (
        <div className="register">
            <span className="registerTitle">Register</span>
            <form className="registerForm" onSubmit={handleSubmit}>
                <label>Username</label>
                <input
                    className="registerInput"
                    type="text"
                    placeholder="Enter Your username..."
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <label>Email</label>
                <input
                    className="registerInput"
                    type="email"
                    required
                    placeholder="Enter Your Email..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label>Password</label>
                <input
                    className="registerInput"
                    type="password"
                    required
                    placeholder="Enter Your Password..."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className="registerButton">Register</button>
            </form>
            <button className="registerLoginButton">
                <Link className="link" to="/login">Login</Link>
            </button>
            {error && <span style={{color: "red", marginTop: "10px"}}>Something went wrong!</span>} {/* how to use flash message instead of this line */}
        </div>
    );
}