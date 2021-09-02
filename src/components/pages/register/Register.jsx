import './register.css';

export default function Register() {
    return (
        <div className="register">
            <span className="registerTitle">Register</span>
            <form className="registerForm">
                <label>Username</label>
                <input className="registerInput" type="text" placeholder="Enter Your username..." />
                <label>Email</label>
                <input className="registerInput" type="text" placeholder="Enter Your Email..." />
                <label>Password</label>
                <input className="registerInput" type="password" placeholder="Enter Your Password..." />
                <button className="registerButton">Register</button>
            </form>
            <button className="registerLoginButton">Login</button>
        </div>
    );
}