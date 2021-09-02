import './singlePost.css';

export default function SinglePost() {
    return (
        <div className="singlePost">
            <div className="singlePostWrapper">
                <img
                    className="singlePostImg"
                    src="https://ak.picdn.net/shutterstock/videos/32151379/thumb/4.jpg"
                    alt=""
                />
                <h1 className="singlePostTitle">
                    Lorem ipsum dolor sit
                    <div className="singlePostEdit">
                        <i className="singlePostIcon far fa-edit"></i>
                        <i className="singlePostIcon far fa-trash-alt"></i>
                    </div>
                </h1>
                <div className="singlePostInfo">
                    <span className="singlePostAuthor">Author: <b>Rahul</b></span>
                    <span className="singlePostDate">1 hour ago</span>
                </div>
                <p className="singlePostDesc">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea eligendi est aperiam quod distinctio blanditiis tempore eum nisi nam sint amet, suscipit fuga voluptatum? Tempora atque iusto dolore suscipit culpa?
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea eligendi est aperiam quod distinctio blanditiis tempore eum nisi nam sint amet, suscipit fuga voluptatum? Tempora atque iusto dolore suscipit culpa?
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea eligendi est aperiam quod distinctio blanditiis tempore eum nisi nam sint amet, suscipit fuga voluptatum? Tempora atque iusto dolore suscipit culpa?
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea eligendi est aperiam quod distinctio blanditiis tempore eum nisi nam sint amet, suscipit fuga voluptatum? Tempora atque iusto dolore suscipit culpa?
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea eligendi est aperiam quod distinctio blanditiis tempore eum nisi nam sint amet, suscipit fuga voluptatum? Tempora atque iusto dolore suscipit culpa?
                </p>
            </div>
        </div>
    );
}