import "./topbar.css";
import { Link } from "react-router-dom";

export default function Topbar() {
    const user = false;
    return (
        <div className="top">
            <div className="topLeft">
                <i className="topIcon fab fa-facebook"></i> {/* font-awesome icon */}
                <i className="topIcon fab fa-twitter"></i>
                <i className="topIcon fab fa-instagram"></i>
                <i className="topIcon fab fa-pinterest"></i>
            </div>
            <div className="topCenter">
                <ul className="topList">
                    <li className="topListItem">
                        <Link className="link" to="/">Home</Link>
                    </li>
                    <li className="topListItem">
                        <Link className="link" to="/about">About</Link>
                    </li>
                    <li className="topListItem">
                        <Link className="link" to="/contact">Contact</Link>
                    </li>
                    <li className="topListItem">
                        <Link className="link" to="/write">Write</Link>
                    </li>
                    <li className="topListItem">
                        {user && "Logout"}
                    </li>
                </ul>
            </div>
            <div className="topRight">
                {user ? (
                    <img className="topImg"
                        src="https://i.pinimg.com/originals/ae/ec/c2/aeecc22a67dac7987a80ac0724658493.jpg"
                        alt="profile-pic"
                    />
                ) : (
                    <div className="topList">
                        <div className="topListItem">
                            <Link className="link" to="/login">Login</Link>
                        </div>
                        <div className="topListItem">
                            <Link className="link" to="/register">Register</Link>
                        </div>
                    </div>
                )
                }
                <i className="topSearchIcon fas fa-search"></i>

            </div>
        </div>
    )
}
