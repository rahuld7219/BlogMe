import './post.css';
import { Link } from "react-router-dom";
export default function Post({ post }) {
    const imgDir = process.env.NODE_ENV === "production" ? "https://blog-mee.herokuapp.com/images" : "http://localhost:8080/images";
    return (
        <div className="post">
            {post.photo && (
                <img
                    className="postImg"
                    src={`${imgDir}/${post.photo}`}
                    alt=""
                />)
            }
            <div className="postInfo">
                <div className="postCategories">
                    {post.categories.map((category, index) => <span key={index} className="postCategory">{category}</span>)}
                </div>
                <Link to={`/post/${post._id}`} className="link">
                    <span className="postTitle">{post.title}</span>
                </Link>
                <hr />
                <span className="postDate">{new Date(post.createdAt).toDateString()}</span>
            </div>
            <p className="postDesc">
                {post.desc}
            </p>
        </div>
    )
}
