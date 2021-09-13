import { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../header/Header";
import Posts from "../../posts/Posts";
import Sidebar from "../../sidebar/Sidebar";
import './home.css';

export default function Home() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const res = await axios.get("/posts");
            console.log(res.data);
            setPosts(res.data);
        }
        fetchPosts();
    }, []);
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