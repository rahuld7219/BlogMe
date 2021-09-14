import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import './singlePost.css';

export default function SinglePost() {
    const location = useLocation(); // gives information about the current URL
    const postId = location.pathname.split("/")[2]; // useParams could also be used here instead
    const [post, setPost] = useState({});
    useEffect(() => {
        const getPost = async () => {
            const res = await axios.get(`/posts/${postId}`);
            setPost(res.data);
        }
        getPost();
    }, []);
    return (
        <div className="singlePost">
            <div className="singlePostWrapper">
                {post.photo && (<img
                    className="singlePostImg"
                    src="https://ak.picdn.net/shutterstock/videos/32151379/thumb/4.jpg"
                    alt=""
                />)}
                <h1 className="singlePostTitle">
                    {post.title}
                    <div className="singlePostEdit">
                        <i className="singlePostIcon far fa-edit"></i>
                        <i className="singlePostIcon far fa-trash-alt"></i>
                    </div>
                </h1>
                <div className="singlePostInfo">
                    <span className="singlePostAuthor">Author: <Link to={`/?user=${post.username}`} className="link"><b>{post.username}</b></Link></span>
                    <span className="singlePostDate">{new Date(post.createdAt).toDateString()}</span>
                </div>
                <p className="singlePostDesc">
                    {post.desc}
                </p>
            </div>
        </div>
    );
}