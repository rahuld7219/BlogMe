import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../../context/Context";
import { UpdateStart, UpdateSuccess, UpdateFailure } from "../../../context/Actions";
import Sidebar from "../../sidebar/Sidebar";
import './settings.css';

export default function Settings() {
    const [file, setFile] = useState(null);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [success, setSuccess] = useState(false);

    const { user, dispatch } = useContext(Context);

    useEffect(() => {
        const getUser = async () => {
            const res = await axios.get(`/users/${user._id}`);
            setUsername(res.data.username);
            setEmail(res.data.email);
        }
        getUser();
    }, [user._id]);

    const imgDir = "http://localhost:8080/images";

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(UpdateStart()); // could pass { type: "UPDATE_START" }
        const updatedUser = {
            userId: user._id,
            username,
            email,
            password
        };
        // To add and upload image file
        if (file) {
            const fileData = new FormData();
            const filename = Date.now() + file.name; // Date used to give unique file name, we can use any uid package instead
            fileData.append("filename", filename);
            fileData.append("file", file);
            updatedUser.profilePic = filename;
            try {
                await axios.post("/upload", fileData);
            } catch (err) {
                // code
            }
        }
        // update user
        try {
            const res = await axios.put(`/users/${user._id}`, updatedUser);
            setSuccess(true);
            dispatch(UpdateSuccess(res.data)); // could pass { type: "UPDATE_SUCCESS", payload: res.data }
            // window.location.replace(`/post/${res.data._id}`);

        } catch (err) {
            // code
            dispatch(UpdateFailure()); // could pass { type: "UPDATE_Failure" }
        }
    }

    return (
        <div className="settings">
            <div className="settingsWrapper">
                <div className="settingsTitle">
                    <span className="settingsUpdateTitle">Update Account</span>
                    <span className="settingsDeleteTitle"><b>Delete Account</b></span>
                </div>
                <form className="settingsForm" onSubmit={handleSubmit}>
                    <label>Profile Picture</label>
                    <div className="settingsProfilePic">
                        <img
                            src={file ? URL.createObjectURL(file) : `${imgDir}/${user.profilePic}`}
                            alt="profile-pic"
                        />
                        <label htmlFor="fileInput">
                            <i className="settingsProfilePicIcon far fa-user-circle"></i>
                        </label>
                        <input
                            type="file"
                            id="fileInput"
                            style={{ display: "none" }}
                            onChange={(e) => setFile(e.target.files[0])}
                        />
                    </div>
                    <label htmlFor="username">Username</label>
                    <input
                        id="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder={user.username}
                        required
                    />
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={user.email}
                        required
                    />
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="********"
                        required
                    />
                    <button className="settingsSubmit" type="submit">Update</button>
                    {success && ( // how to use flash message here
                        <span
                            style={{ color: "green", textAlign: "center", marginTop: "20px" }}
                        >
                            Profile has been updated...
                        </span>)} 
                </form>
            </div>
            <Sidebar />
        </div>
    );
}