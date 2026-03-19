import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const token = localStorage.getItem('secretdrop_token');

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    localStorage.removeItem('secretdrop_token');
    localStorage.removeItem('secretdrop_user');
    window.location.href = '/';
  };

  return (
    <nav className="navbar" id="main-navbar">
      <div className="navbar-container container">
        <Link to="/" className="navbar-logo" id="navbar-logo">
          <span className="logo-icon">🎁</span>
          <span className="logo-text">SecretDrop</span>
        </Link>

        <button
          className={`hamburger ${menuOpen ? 'active' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          id="hamburger-btn"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <ul className={`nav-menu ${menuOpen ? 'active' : ''}`} id="nav-menu">
          <li>
            <Link
              to="/"
              className={`nav-link ${isActive('/') ? 'active' : ''}`}
              onClick={() => setMenuOpen(false)}
              id="nav-home"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/gifts"
              className={`nav-link ${isActive('/gifts') ? 'active' : ''}`}
              onClick={() => setMenuOpen(false)}
              id="nav-gifts"
            >
              Gifts
            </Link>
          </li>
          <li>
            <Link
              to="/how-it-works"
              className={`nav-link ${isActive('/how-it-works') ? 'active' : ''}`}
              onClick={() => setMenuOpen(false)}
              id="nav-how-it-works"
            >
              How It Works
            </Link>
          </li>
          <li>
            <Link
              to="/send-gift"
              className={`nav-link ${isActive('/send-gift') ? 'active' : ''}`}
              onClick={() => setMenuOpen(false)}
              id="nav-send-gift"
            >
              Send a Gift
            </Link>
          </li>
          {token ? (
            <li>
              <button className="nav-link logout-btn" onClick={handleLogout} id="nav-logout">
                Logout
              </button>
            </li>
          ) : (
            <>
              <li>
                <Link
                  to="/login"
                  className={`nav-link ${isActive('/login') ? 'active' : ''}`}
                  onClick={() => setMenuOpen(false)}
                  id="nav-login"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/signup"
                  className="nav-link nav-signup"
                  onClick={() => setMenuOpen(false)}
                  id="nav-signup"
                >
                  Sign Up
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
