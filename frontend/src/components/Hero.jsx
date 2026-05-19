import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';

function Hero() {
  const [counts, setCounts] = useState({ gifts: 0, receivers: 0 });
  const [hasAnimated, setHasAnimated] = useState(false);
  const statsRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          // Animate count up
          const duration = 2000;
          const steps = 60;
          const interval = duration / steps;
          let step = 0;

          const timer = setInterval(() => {
            step++;
            const progress = step / steps;
            const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
            setCounts({
              gifts: Math.round(10000 * eased),
              receivers: Math.round(5000 * eased),
            });
            if (step >= steps) clearInterval(timer);
          }, interval);
        }
      },
      { threshold: 0.5 }
    );

    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <section className="hero" id="hero-section">
      {/* Animated gradient orbs */}
      <div className="hero-orbs" aria-hidden="true">
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="orb orb-3"></div>
      </div>

      {/* Floating decorations */}
      <div className="hero-decorations" aria-hidden="true">
        <span className="hero-decoration dec-1">🎁</span>
        <span className="hero-decoration dec-2">🎀</span>
        <span className="hero-decoration dec-3">✨</span>
        <span className="hero-decoration dec-4">💝</span>
        <span className="hero-decoration dec-5">🎊</span>
        <span className="hero-decoration dec-6">🎉</span>
        <span className="hero-decoration dec-7">💌</span>
      </div>

      <div className="hero-content container">
        <span className="hero-badge fade-in">
          <span className="badge-dot"></span>
          Anonymous Gifting Made Easy
        </span>

        <h1 className="hero-title" id="hero-headline">
          Send Gifts Without<br />
          <span className="hero-highlight">Revealing Yourself</span>
        </h1>

        <p className="hero-subtitle" id="hero-subtext">
          SecretDrop lets you surprise someone with anonymous gifts.
          Make someone&apos;s day special — secretly and beautifully!
        </p>

        <div className="hero-actions">
          <Link to="/send-gift" className="btn btn-primary hero-btn" id="hero-send-gift-btn">
            <span>🎁</span> Send a Gift
          </Link>
          <Link to="/gifts" className="btn btn-secondary hero-btn" id="hero-browse-btn">
            Browse Gifts
          </Link>
        </div>

        <div className="hero-stats" ref={statsRef}>
          <div className="stat-card">
            <span className="stat-number">{counts.gifts.toLocaleString()}+</span>
            <span className="stat-label">Gifts Sent</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-card">
            <span className="stat-number">{counts.receivers.toLocaleString()}+</span>
            <span className="stat-label">Happy Receivers</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-card">
            <span className="stat-number">100%</span>
            <span className="stat-label">Anonymous</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
