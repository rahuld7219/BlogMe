import React from 'react';
import './topbar.css';

export default function Topbar() {
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
                    <li className="topListItem">Home</li>
                    <li className="topListItem">About</li>
                    <li className="topListItem">Contact</li>
                    <li className="topListItem">Write</li>
                    <li className="topListItem">Logout</li>
                </ul>
            </div>
            <div className="topRight">
                <img className="topImg"
                src="https://i.pinimg.com/originals/ae/ec/c2/aeecc22a67dac7987a80ac0724658493.jpg"
                alt="profile-pic" />
                <i className="topSearchIcon fas fa-search"></i>
            </div>
        </div>
    )
}
