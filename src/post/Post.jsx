import './post.css';

export default function Post() {
    return (
        <div className="post">
            <img
                className="postImg"
                src="https://antranik.org/wp-content/uploads/2011/08/mind-blowing-amazing-awesome-random-facts-1024x1024.jpg"
                alt=""
            />
            <div className="postInfo">
                <div className="postCategories">
                    <span className="postCategory">Life</span>
                    <span className="postCategory">Music</span>
                </div>
                <span className="postTitle">Lorem ipsum dolor sit amet</span>
                <hr />
                <span className="postDate">1 hour ago</span>
            </div>
            <p className="postDesc">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
                Quis magni nulla dolorum cum explicabo laborum unde sint 
                aliquam, expedita temporibus dolorem voluptatum officiis 
                laboriosam incidunt minus! Hic voluptas rem voluptatibus?
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
                Quis magni nulla dolorum cum explicabo laborum unde sint 
                aliquam, expedita temporibus dolorem voluptatum officiis 
                laboriosam incidunt minus! Hic voluptas rem voluptatibus?
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
                Quis magni nulla dolorum cum explicabo laborum unde sint 
                aliquam, expedita temporibus dolorem voluptatum officiis 
                laboriosam incidunt minus! Hic voluptas rem voluptatibus?
            </p>
        </div>
    )
}
