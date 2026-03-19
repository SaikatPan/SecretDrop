import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../services/api';
import './Auth.css';

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setStatus({ type: 'error', message: 'Please fill in all fields.' });
      return;
    }

    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      const res = await API.post('/auth/login', form);
      localStorage.setItem('secretdrop_token', res.data.token);
      localStorage.setItem('secretdrop_user', JSON.stringify(res.data.user));
      setStatus({ type: 'success', message: '🎉 Login successful! Redirecting...' });
      setTimeout(() => navigate('/'), 1000);
    } catch (err) {
      setStatus({
        type: 'error',
        message: err.response?.data?.message || 'Login failed. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-page" id="login-page">
      <div className="auth-container">
        <div className="auth-card glass-card">
          <div className="auth-header">
            <span className="auth-icon">🔐</span>
            <h1 className="auth-title">Welcome Back</h1>
            <p className="auth-subtitle">Login to continue sending secret gifts</p>
          </div>

          <form onSubmit={handleSubmit} id="login-form">
            {status.message && (
              <div className={`alert alert-${status.type}`}>{status.message}</div>
            )}

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
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary auth-btn"
              disabled={loading}
              id="login-btn"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <p className="auth-footer-text">
            Don&apos;t have an account?{' '}
            <Link to="/signup" className="auth-link" id="go-to-signup">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}

export default Login;
