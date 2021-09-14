import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './sidebar.css';

export default function Sidebar() {
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        const fetchCategories = async () => {
            const res = await axios.get("/categories");
            setCategories(res.data);
        }
        fetchCategories();
    }, [])
    return (
        <div className="sidebar">
            <div className="sidebarItem">
                <span className="sidebarTitle">About Me</span>
                <img src="https://randomwordgenerator.com/img/picture-generator/53e1d1404f5aa414f1dc8460962e33791c3ad6e04e5077497c2a7cd4924ec7_640.jpg"
                    alt="" />
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem sapiente et officia repellat quis
                </p>
            </div>
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
                <div className="sidebarSocial">
                    <i className="sidebarIcon fab fa-facebook"></i> {/* font-awesome icon */}
                    <i className="sidebarIcon fab fa-twitter"></i>
                    <i className="sidebarIcon fab fa-instagram"></i>
                    <i className="sidebarIcon fab fa-pinterest"></i>
                </div>
            </div>
        </div>
    );
}