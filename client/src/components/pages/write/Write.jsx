import axios from 'axios';
import { useContext, useState } from 'react';
import { Context } from '../../../context/Context';
import './write.css';

export default function Write() {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [file, setFile] = useState(null);

    const { user } = useContext(Context);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newPost = {
            title,
            desc,
            username: user.username
        };
        // To add and upload image file
        if (file) {
            const fileData = new FormData();
            const filename = Date.now() + file.name; // Date used to give unique file name, we can use any uid package instead
            fileData.append("filename", filename);
            fileData.append("file", file);
            newPost.photo = filename;
            try {
                await axios.post("/upload", fileData);
            } catch (err) {
                // code
            }
        }
        // create post
        try {
            const res = await axios.post("/posts", newPost);
            window.location.replace(`/post/${res.data._id}`); // after successful post creation, go to that single post page
        } catch (err) {
            //code
        }
    }

    return (
        <div className="write">
            {file && (
                <img
                    className="writeImg"
                    src={URL.createObjectURL(file)}
                    alt="post-img"
                />)
            }
            <form className="writeForm" onSubmit={handleSubmit}>
                <div className="writeFormGroup">
                    <label htmlFor="fileInput">
                        <i className="writeIcon fas fa-plus"></i>
                    </label>
                    <input
                        type="file"
                        id="fileInput"
                        style={{ display: "none" }}
                        onChange={(e) => setFile(e.target.files[0])} // as we are uploading a single file so we used files[0]
                    />
                    <input
                        type="text"
                        className="writeInput"
                        placeholder="Title"
                        autoFocus={true}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="writeFormGroup">
                    <textarea
                        placeholder="Tell Your Story..."
                        type="text"
                        className="writeInput writeText"
                        onChange={(e) => setDesc(e.target.value)}
                        required
                    ></textarea>
                </div>
                <button className="writeSubmit" type="submit">Publish</button>
            </form>
        </div>
    );
}