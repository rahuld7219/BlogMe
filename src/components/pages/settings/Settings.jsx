import Sidebar from "../../sidebar/Sidebar";
import './settings.css';

export default function Settings() {
    return (
        <div className="settings">
            <div className="settingsWrapper">
                <div className="settingsTitle">
                    <span className="settingsUpdateTitle">Update Account</span>
                    <span className="settingsDeleteTitle">Delete Account</span>
                </div>
                <form className="settingsForm">
                    <label>Profile Picture</label>
                    <div className="settingsProfilePic">
                        <img src="https://ak.picdn.net/shutterstock/videos/32151379/thumb/4.jpg" alt="" />
                        <label htmlFor="fileInput">
                            <i className="settingsProfilePicIcon far fa-user-circle"></i>
                        </label>
                        <input type="file" id="fileInput" style={{ display: "none" }} />
                    </div>
                    <label>Username</label>
                    <input type="text" placeholder="Rahul" />
                    <label>Email</label>
                    <input type="email" placeholder="rahul@gmail.com" />
                    <label>Password</label>
                    <input type="password" />
                    <button className="settingsSubmit">Update</button>
                </form>
            </div>
            <Sidebar />
        </div>
    );
}