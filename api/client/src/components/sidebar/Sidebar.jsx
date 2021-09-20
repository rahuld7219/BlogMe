import axiosInstance from "../../../src/config";
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../../context/Context';
import './sidebar.css';

export default function Sidebar() {
    const [categories, setCategories] = useState([]);
    const { user } = useContext(Context);
    useEffect(() => {
        const fetchCategories = async () => {
            const res = await axiosInstance.get("/categories");
            setCategories(res.data);
        }
        fetchCategories();
    }, [])
    const imgDir = "https://blog-mee.herokuapp.com/images";
    return (
        <div className="sidebar">
            {user && (
                <div className="sidebarItem">
                    <span className="sidebarTitle">About Me</span>
                    <img src={`${imgDir}/${user.profilePic}`}
                        alt="" />
                    <p>
                        {user.about}
                    </p>
                </div>
            )}
            <div className="sidebarItem">
                <span className="sidebarTitle">Categories</span>
                <ul className="sidebarList">
                    {categories.map((category) => (
                        <li
                            className="sidebarListItem"
                            key={category._id}
                        >
                            <Link to={`/?category=${category.name}`} className="link">{category.name}</Link>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="sidebarItem">
                <span className="sidebarTitle">Follow Us</span>
                <div className="sidebarSocialBlock">
                    <i className="sidebarIcon fab fa-facebook"></i> {/* font-awesome icon */}
                    <i className="sidebarIcon fab fa-twitter"></i>
                    <i className="sidebarIcon fab fa-instagram"></i>
                    <i className="sidebarIcon fab fa-pinterest"></i>
                </div>
            </div>
        </div>
    );
}