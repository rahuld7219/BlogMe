import './write.css';

export default function Write() {
    return (
        <div className="write">
            <img
                className="writeImg"
                src="https://ak.picdn.net/shutterstock/videos/32151379/thumb/4.jpg"
                alt=""
            />
            <form className="writeForm">
                <div className="writeFormGroup">
                    <label htmlFor="fileInput">
                        <i className="writeIcon fas fa-plus"></i>
                    </label>
                    <input type="file" id="fileInput" style={{ display: "none" }} />
                    <input
                        type="text"
                        className="writeInput"
                        placeholder="Title"
                        autoFocus={true}
                    />
                </div>
                <div className="writeFormGroup">
                    <textarea
                        placeholder="Tell Your Story..."
                        type="text"
                        className="writeInput writeText"
                    ></textarea>
                </div>
                <button className="writeSubmit">Publish</button>
            </form>
        </div>
    );
}