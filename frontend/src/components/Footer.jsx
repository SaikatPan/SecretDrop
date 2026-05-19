import { useState } from 'react';
import './Footer.css';

function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletter = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="footer" id="footer">
      {/* Wave separator */}
      <div className="footer-wave" aria-hidden="true">
        <svg viewBox="0 0 1440 100" preserveAspectRatio="none">
          <path
            d="M0,40 C360,100 720,0 1080,60 C1260,90 1380,50 1440,40 L1440,100 L0,100 Z"
            fill="currentColor"
          />
        </svg>
      </div>

      <div className="footer-main">
        <div className="footer-container container">
          <div className="footer-brand">
            <div className="footer-logo">
              <span className="footer-logo-icon">🎁</span>
              <span className="footer-logo-text">SecretDrop</span>
            </div>
            <p className="footer-tagline">
              Making anonymous gifting simple, fun, and memorable. Spread joy without revealing yourself.
            </p>

            {/* Newsletter */}
            <form className="newsletter-form" onSubmit={handleNewsletter}>
              <div className="newsletter-input-wrapper">
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="newsletter-input"
                  id="newsletter-email"
                  required
                />
                <button type="submit" className="newsletter-btn" id="newsletter-submit">
                  {subscribed ? '✓' : '→'}
                </button>
              </div>
              {subscribed && (
                <p className="newsletter-success">🎉 Thanks for subscribing!</p>
              )}
            </form>
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
            <a href="https://www.instagram.com/_secretdrop?igsh=MTg0c3I4bWxzbDFqNQ==" target="_blank" rel="noopener noreferrer" className="social-link" id="footer-instagram">
              <span className="social-icon">📸</span>
              <span>@secretdrop</span>
            </a>
            <a href="mailto:hello@secretdrop.com" className="social-link" id="footer-email">
              <span className="social-icon">✉️</span>
              <span>hello@secretdrop.com</span>
            </a>
          </div>
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
