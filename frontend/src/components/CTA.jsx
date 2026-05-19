import { Link } from 'react-router-dom';
import './CTA.css';

function CTA() {
  return (
    <section className="cta-section" id="cta-section">
      <div className="cta-orbs" aria-hidden="true">
        <div className="cta-orb cta-orb-1"></div>
        <div className="cta-orb cta-orb-2"></div>
      </div>

      <div className="container">
        <div className="cta-content">
          <span className="cta-emoji">💝</span>
          <h2 className="cta-title">Ready to Make Someone&apos;s Day?</h2>
          <p className="cta-subtitle">
            Send a surprise gift anonymously and bring unexpected joy to someone&apos;s life.
          </p>
          <div className="cta-actions">
            <Link to="/send-gift" className="btn btn-primary cta-btn" id="cta-send-gift">
              🎁 Send a Gift Now
            </Link>
            <Link to="/gifts" className="btn btn-secondary cta-btn cta-btn--outline" id="cta-browse">
              Explore Gifts
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CTA;
