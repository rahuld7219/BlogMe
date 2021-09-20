import "./footer.css";

export default function Footer() {
    return (
        <footer className="footer">
            <span className="textMuted copyright">&copy; BlogMe {new Date().getFullYear()}</span>
            <span className="textMuted">Privacy Policy</span>
            <span className="textMuted">Terms of Service</span>
        </footer>
    );
}