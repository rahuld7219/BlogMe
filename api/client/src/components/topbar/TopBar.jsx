import "./topbar.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../../context/Context";
import { Logout } from "../../context/Actions"
// import axios from "axios"

export default function Topbar() {
    const { user, dispatch } = useContext(Context);

    const imgDir = process.env.NODE_ENV === "production" ? "https://blog-mee.herokuapp.com/images" : "http://localhost:8080/images";

    const handleLogout = async () => {
        dispatch(Logout());
    }

    return (
        <div className="top">
            <div className="topLeft">
                <div className="topTitle">BlogMe</div>
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
                    <li className="topListItem" onClick={handleLogout}>
                        {user && "Logout"}
                    </li>
                </ul>
            </div>
            <div className="topRight">
                {user ? (
                    <Link to="/settings">
                        <img
                            className="topImg"
                            src={`${imgDir}/${user.profilePic}`}
                            alt="profile-pic"
                        />
                    </Link>
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
