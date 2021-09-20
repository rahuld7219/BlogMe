import { useState, useEffect } from "react";
import axiosInstance from "../../../../src/config";
import Header from "../../header/Header";
import Posts from "../../posts/Posts";
import Sidebar from "../../sidebar/Sidebar";
import './home.css';
import { useLocation } from "react-router";

export default function Home() {
    const [posts, setPosts] = useState([]);
    const { search } = useLocation(); // `search` will have query string, if no query string then it will be empty string
    useEffect(() => {
        const fetchPosts = async () => {
            const res = await axiosInstance.get(`/posts${search}`);
            setPosts(res.data);
        }
        fetchPosts();
    }, [search]);
    return (
        <>
            <Header />
            <div className="home">
                <Posts posts={posts}/>
                <Sidebar />
            </div>
        </>
    );
}