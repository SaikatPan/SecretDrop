import './Footer.css';

function Footer() {
  return (
    <footer className="footer" id="footer">
      <div className="footer-container container">
        <div className="footer-brand">
          <div className="footer-logo">
            <span className="footer-logo-icon">🎁</span>
            <span className="footer-logo-text">SecretDrop</span>
          </div>
          <p className="footer-tagline">
            Making anonymous gifting simple, fun, and memorable.
          </p>
        </div>

        <div className="footer-links">
          <h4 className="footer-heading">Quick Links</h4>
          <a href="/">Home</a>
          <a href="/gifts">Gifts</a>
          <a href="/how-it-works">How It Works</a>
          <a href="/send-gift">Send a Gift</a>
        </div>

        <div className="footer-links">
          <h4 className="footer-heading">Account</h4>
          <a href="/login">Login</a>
          <a href="/signup">Sign Up</a>
        </div>

        <div className="footer-connect">
          <h4 className="footer-heading">Connect</h4>
          <a href="https://instagram.com/secretdrop" target="_blank" rel="noopener noreferrer" className="social-link" id="footer-instagram">
            📸 Instagram
          </a>
          <a href="mailto:hello@secretdrop.com" className="social-link" id="footer-email">
            ✉️ hello@secretdrop.com
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} SecretDrop. All rights reserved. Made with 💝</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
