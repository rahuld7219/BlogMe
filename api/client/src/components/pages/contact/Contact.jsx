import "./contact.css"

export default function Contact() {
    return (
        <div className="contact">
            <p className="contactMainHeading">We’d love to hear<br />from you.</p>
            <div className="contactBlock">
                <div className="contactContainer">
                    <div className="contactDesc">
                        <p>BlogMe on Twitter</p>
                        <span>@blogme</span>
                    </div>
                    <div className="contactType">
                        Social
                    </div>
                </div>
                <div className="contactContainer">
                    <div className="contactDesc">
                        <p>new@blogme.com</p>
                        <span>+91 011 961 4995</span>
                    </div>
                    <div className="contactType">
                        General Contact
                    </div>
                </div>
                <div className="contactContainer">
                    <div className="contactDesc">
                        <p>37 Greenpoint Ave </p>
                        <p> #219</p>
                        <p> Brooklyn, NY </p>
                        <p>11222</p>
                    </div>
                    <div className="contactType">
                        Find Us
                    </div>
                </div>
            </div>
        </div>
    );
}