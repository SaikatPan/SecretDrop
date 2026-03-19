import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../services/api';
import './Auth.css';

function SignUp() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) {
      setStatus({ type: 'error', message: 'Please fill in all fields.' });
      return;
    }
    if (form.password.length < 6) {
      setStatus({ type: 'error', message: 'Password must be at least 6 characters.' });
      return;
    }

    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      const res = await API.post('/auth/register', form);
      localStorage.setItem('secretdrop_token', res.data.token);
      localStorage.setItem('secretdrop_user', JSON.stringify(res.data.user));
      setStatus({ type: 'success', message: '🎉 Account created! Redirecting...' });
      setTimeout(() => navigate('/'), 1000);
    } catch (err) {
      setStatus({
        type: 'error',
        message: err.response?.data?.message || 'Registration failed. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-page" id="signup-page">
      <div className="auth-container">
        <div className="auth-card glass-card">
          <div className="auth-header">
            <span className="auth-icon">✨</span>
            <h1 className="auth-title">Create Account</h1>
            <p className="auth-subtitle">Join SecretDrop and start sending anonymous gifts</p>
          </div>

          <form onSubmit={handleSubmit} id="signup-form">
            {status.message && (
              <div className={`alert alert-${status.type}`}>{status.message}</div>
            )}

            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                className="form-input"
                placeholder="John Doe"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-input"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                className="form-input"
                placeholder="Min 6 characters"
                value={form.password}
                onChange={handleChange}
                required
                minLength={6}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary auth-btn"
              disabled={loading}
              id="signup-btn"
            >
              {loading ? 'Creating Account...' : 'Sign Up'}
            </button>
          </form>

          <p className="auth-footer-text">
            Already have an account?{' '}
            <Link to="/login" className="auth-link" id="go-to-login">
              Login
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}

export default SignUp;
