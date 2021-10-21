import axiosInstance from "../../../../src/config";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../../context/Context";
import { UpdateStart, UpdateSuccess, UpdateFailure, Logout } from "../../../context/Actions";
import Sidebar from "../../sidebar/Sidebar";
import './settings.css';

export default function Settings() {
    const [file, setFile] = useState(null);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [about, setAbout] = useState("");
    const [password, setPassword] = useState("");
    const [success, setSuccess] = useState(false);

    const { user, isFetching, dispatch } = useContext(Context);

    useEffect(() => {
        const getUser = async () => {
            try {
                const res = await axiosInstance.get(
                    `/users/${user._id}`,
                    {
                        headers: {
                            authorization: `Bearer ${user.accessToken}`
                        }
                    });
                setUsername(res.data.username);
                setEmail(res.data.email);
                setAbout(res.data.about);
            } catch (err) {
                if (err.response.status === 401 || err.response.status === 403) {
                    dispatch(Logout());
                    window.location.replace("/login");
                } else {
                    console.log(err)
                }
            }
        }
        getUser();
    }, []);

    const imgDir = process.env.NODE_ENV === "production" ? "https://blog-mee.herokuapp.com/images" : "http://localhost:8080/images";

    const handleUpdateUser = async (e) => {
        e.preventDefault();
        dispatch(UpdateStart());
        const updatedUser = {
            userId: user._id,
            username,
            email,
            password,
            about
        };
        // To add and upload image file
        if (file) {
            const fileData = new FormData();
            const filename = Date.now() + file.name; // Date used to give unique file name, we can use any uid package instead
            fileData.append("filename", filename);
            fileData.append("file", file);
            updatedUser.profilePic = filename;
            try {
                await axiosInstance.post("/upload", fileData);
            } catch (err) {
                // code
            }
        }
        // update user
        try {
            const res = await axiosInstance.put(
                `/users/${user._id}`,
                updatedUser,
                {
                    headers: {
                        authorization: `Bearer ${user.accessToken}`
                    }
                });
            setSuccess(true);
            dispatch(UpdateSuccess(res.data));
            // window.location.replace(`/post/${res.data._id}`);

        } catch (err) {
            if (err.response.status === 401 || err.response.status === 403) {
                dispatch(Logout());
                window.location.replace("/login");
            } else {
                dispatch(UpdateFailure());
            }
        }
    }

    const handleDeleteUser = async () => {
        const deleteUser = window.confirm("All your details including your posts will be DLETED PERMANENTLY...\
        \nAre you sure you want to DELETE your account?");
        if (deleteUser) {
            try {
                await axiosInstance.delete(
                    `/users/${user._id}`,
                    {
                        data: {
                            userId: user._id
                        },
                        headers: {
                            authorization: `Bearer ${user.accessToken}`
                        }
                    });
                dispatch(Logout());
                window.location.replace("/");
            } catch (err) {
                console.log(err);
            }
        }
    }

    return (
        <div className="settings">
            <div className="settingsWrapper">
                <div className="settingsTitle">
                    <span className="settingsUpdateTitle">Update Account</span>
                    <span className="settingsDeleteTitle" onClick={handleDeleteUser}><b>Delete Account</b></span>
                </div>
                <form className="settingsForm" onSubmit={handleUpdateUser}>
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
                    <label htmlFor="about">About</label>
                    <textarea
                        id="about"
                        type="text"
                        rows={5}
                        value={about}
                        placeholder={user.about}
                        onChange={(e) => setAbout(e.target.value)}
                    />
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="********"
                        required
                    />
                    <button className="settingsSubmit" type="submit" disabled={isFetching}>Update</button>
                    {success && (
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