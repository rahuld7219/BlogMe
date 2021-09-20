import SinglePost from '../../singlePost/SinglePost';
import Sidebar from '../../sidebar/Sidebar';
import './single.css';

export default function Single() {
    return (
        <div className="single">
            <SinglePost />
            <Sidebar />
        </div>
    );
}