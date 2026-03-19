import { Link } from 'react-router-dom';
import './Hero.css';

function Hero() {
  return (
    <section className="hero" id="hero-section">
      {/* Floating decorations */}
      <div className="hero-decoration dec-1">🎁</div>
      <div className="hero-decoration dec-2">🎀</div>
      <div className="hero-decoration dec-3">✨</div>
      <div className="hero-decoration dec-4">💝</div>
      <div className="hero-decoration dec-5">🎊</div>
      <div className="hero-decoration dec-6">🎉</div>

      <div className="hero-content container">
        <span className="hero-badge">✨ Anonymous Gifting Made Easy</span>
        <h1 className="hero-title" id="hero-headline">
          Send Gifts Without<br />
          <span className="hero-highlight">Revealing Yourself</span>
        </h1>
        <p className="hero-subtitle" id="hero-subtext">
          SecretDrop lets you surprise someone with anonymous gifts.
          <br />
          Make someone&apos;s day special, secretly!
        </p>
        <div className="hero-actions">
          <Link to="/send-gift" className="btn btn-primary" id="hero-send-gift-btn">
            🎁 Send a Gift
          </Link>
          <Link to="/gifts" className="btn btn-secondary" id="hero-browse-btn">
            Browse Gifts
          </Link>
        </div>

        <div className="hero-stats">
          <div className="stat-item">
            <span className="stat-number">10K+</span>
            <span className="stat-label">Gifts Sent</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">5K+</span>
            <span className="stat-label">Happy Receivers</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">100%</span>
            <span className="stat-label">Anonymous</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
