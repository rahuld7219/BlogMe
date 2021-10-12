import './header.css';

export default function Header() {
    const imgDir = process.env.NODE_ENV === "production" ? "https://blog-mee.herokuapp.com/images" : "http://localhost:8080/images";
    return (
        <div className="header">
            <div className="headerTitles">
                <span className="headerTitleSm">React & Node</span>
                <span className="headerTitleLg">Blog</span>
            </div>
            <img
                className="headerImg"
                src={`${imgDir}/home.png`}
                alt=""
            />
        </div>
    );
}