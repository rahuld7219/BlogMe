import axios from "axios";
//import jwt_decode from "jwt-decode"; // to decode the jwt token
import { useContext, useEffect, useState } from "react";
import { Context } from "../../../context/Context";
import { UpdateStart, UpdateSuccess, UpdateFailure, Logout, /*RenewTokens*/ } from "../../../context/Actions";
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
                const res = await axios.get(
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

    const imgDir = "http://localhost:8080/images";

    // // renew access token and refresh token (JWT)
    // const renewTokens = async () => {
    //     try {
    //         const res = await axios.post("/auth/refresh", { refreshToken: user.refreshToken });
    //         dispatch(RenewTokens(res.data));
    //         console.log(res.data, "renew Token data");
    //         return res.data;
    //     } catch (err) {
    //         // code
    //         console.log(err);
    //     }
    // }

    // // creating a new instance of axios
    // const axiosJWT = axios.create();

    // // adding a request interceptor for axiosJWT instance
    // // code in this will be executed before request being send (using axiosJWT instance)
    // axiosJWT.interceptors.request.use(
    //     async (config) => {
    //         const accessTokenExpTime = jwt_decode(user.accessToken).exp; // to get expiration time of the access token
    //         const currentTime = new Date().getTime() // gives current time in ms
    //         if (accessTokenExpTime * 1000 < currentTime) { // multiplied by 1000 as exp is in seconds
    //             // if access token expired
    //             const data = await renewTokens();
    //             config.headers["authorization"] = `Bearer ${data.accessToken}`; // set the header authorization of the request that being send with the renewed access token
    //             return config;
    //         }
    //     },
    //     (err) => {
    //         return Promise.reject(err); // if error then reject the promise i.e., cancel everything
    //     }
    // );

    const handleUpdateUser = async (e) => {
        e.preventDefault();
        dispatch(UpdateStart()); // could pass { type: "UPDATE_START" }
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
                await axios.post("/upload", fileData);
            } catch (err) {
                // code
            }
        }
        // update user
        try {
            const res = await axios.put(
                `/users/${user._id}`,
                updatedUser,
                {
                    headers: {
                        authorization: `Bearer ${user.accessToken}`
                    }
                });
            setSuccess(true);
            dispatch(UpdateSuccess(res.data)); // could pass { type: "UPDATE_SUCCESS", payload: res.data }
            // window.location.replace(`/post/${res.data._id}`);

        } catch (err) {
            if (err.response.status === 401 || err.response.status === 403) {
                dispatch(Logout());
                window.location.replace("/login");
            } else {
                dispatch(UpdateFailure()); // could pass { type: "UPDATE_Failure" }
            }
        }
    }

    const handleDeleteUser = async () => {
        const deleteUser = window.confirm("All your details including your posts will be DLETED PERMANENTLY...\
        \nAre you sure you want to DELETE your account?");
        if (deleteUser) {
            try {
                await axios.delete(
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