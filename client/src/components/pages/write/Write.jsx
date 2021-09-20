import axios from 'axios';
import { useContext, useState } from 'react';
import { Context } from '../../../context/Context';
import { Logout } from '../../../context/Actions';
import './write.css';

export default function Write() {
    const categories = [
        "Technology", "Travel", "Fashion",
        "Food", "Education", "Spiritual",
        "Finanace", "Entertainment", "Art",
        "Business", "Gaming", "Lifestyle",
        "Health", "Sports", "Politics"
    ];
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [file, setFile] = useState(null);
    const [checkedCategory, setCheckedCategory] = useState(
        new Array(categories.length).fill(false)
    )

    const { user, dispatch } = useContext(Context);

    const handleCategorySelect = (position) => {
        setCheckedCategory(checkedCategory => (
            checkedCategory.map((category, index) => index === position ? !category : category)
        )
        );
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newPost = {
            title,
            desc,
            username: user.username,
            categories: categories.filter((item, index) => checkedCategory[index])
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
            const res = await axios.post("/posts", newPost, {
                headers: {
                    authorization: `Bearer ${user.accessToken}`
                }
            });
            window.location.replace(`/post/${res.data._id}`); // after successful post creation, go to that single post page
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
                    <ul className="categoryList">
                        {categories.map((category, position) => {
                            return (
                                <li key={position} className="categoryListItem">
                                    <label htmlFor={`categoryCheckbox-${position}`}>
                                        <div
                                            className="category"
                                            style={{ backgroundColor: checkedCategory[position] && "#f7b39b" }}
                                        >
                                            {category}
                                        </div>
                                    </label>
                                    <input
                                        style={{ display: "none" }}
                                        type="checkbox"
                                        id={`categoryCheckbox-${position}`}
                                        name={`category-${position}`}
                                        value={category}
                                        checked={checkedCategory[position]}
                                        onChange={() => handleCategorySelect(position)}
                                    />
                                </li>
                            );
                        })}
                    </ul>
                </div>
                <div className="writeFormGroup">
                    <label htmlFor="fileInput">
                        <i className="writeImageIcon far fa-file-image"><p className="writeImageIconDesc">Upload Image</p></i>
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