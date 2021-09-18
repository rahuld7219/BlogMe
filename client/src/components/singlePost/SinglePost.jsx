import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { Context } from '../../context/Context';
import { Logout } from '../../context/Actions';
import './singlePost.css';

export default function SinglePost() {
    const location = useLocation(); // gives information about the current URL
    const postId = location.pathname.split("/")[2]; // useParams could also be used here instead

    const [post, setPost] = useState({});
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [updateMode, setUpdateMode] = useState(false);

    const { user, dispatch } = useContext(Context);

    useEffect(() => {
        const getPost = async () => {
            const res = await axios.get(`/posts/${postId}`);
            setPost(res.data);
            setTitle(res.data.title);
            setDesc(res.data.desc);
        }
        getPost();
    }, [postId]);

    const imgDir = "http://localhost:8080/images";

    const handleDelete = async () => {
        try {
            await axios.delete(`/posts/${postId}`, {
                data: { username: user.username } // unlike post/put/patch method, when using delete method in axios we must specify data property to send data
            }, {
                headers: {
                    authorization: `Bearer ${user.accessToken}`
                }
            });
            window.location.replace("/");
        } catch (err) {
            if (err.response.status === 401 || err.response.status === 403) {
                dispatch(Logout());
                window.location.replace("/login");
            } else {
                console.log(err);
            }
        }
    }

    const handleUpdate = async () => {
        try {
            await axios.put(`/posts/${postId}`, {
                username: user.username,
                title,
                desc
            }, {
                headers: {
                    authorization: `Bearer ${user.accessToken}`
                }
            });
            window.location.reload();
        } catch (err) {
            if (err.response.status === 401 || err.response.status === 403) {
                dispatch(Logout());
                window.location.replace("/login");
            } else {
                console.log(err);
            }
        }
    }

    return (
        <div className="singlePost">
            <div className="singlePostWrapper">
                {post.photo && (<img
                    className="singlePostImg"
                    src={`${imgDir}/${post.photo}`}
                    alt=""
                />)}
                {updateMode ? (
                    <input
                        type="text"
                        className="singlePostTitleInput"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        autoFocus
                    />) : (
                    <h1 className="singlePostTitle">
                        {post.title}
                        {post.username === user?.username && // ?. is optional chaining operator
                            <div className="singlePostEdit">
                                <i
                                    className="singlePostIcon far fa-edit"
                                    onClick={() => setUpdateMode(true)}></i>
                                <i
                                    className="singlePostIcon far fa-trash-alt"
                                    onClick={handleDelete}></i>
                            </div>}
                    </h1>
                )}
                <div className="singlePostInfo">
                    <span className="singlePostAuthor">Author: <Link to={`/?user=${post.username}`} className="link"><b>{post.username}</b></Link></span>
                    <span className="singlePostDate">{new Date(post.createdAt).toDateString()}</span>
                </div>
                {updateMode ? (
                    <textarea
                        className="singlePostDescInput"
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                    />) : (
                    <p className="singlePostDesc">
                        {post.desc}
                    </p>
                )}
                {updateMode && (<div className="singlePostButtons">
                    <button className="singlePostUpdateButton" onClick={handleUpdate}>Update</button>
                    <button className="singlePostCancelButton" onClick={() => setUpdateMode(false)}>Cancel</button>
                </div>
                )}
            </div>
        </div>
    );
}