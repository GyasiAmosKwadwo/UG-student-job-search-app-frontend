import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) return;

    setError('');
    setLoading(true);

    try {
      const role = await login(email, password);
      // Backend successful. Navigate them
      navigate(`/${role}/dashboard`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="auth">
      <div className="auth-panel">
        <p className="eyebrow">Welcome back</p>
        <h1>Log in to UG CareerLink.</h1>
        <p className="lead muted">
          Access saved applications, track interviews, and manage verified
          postings in one secure dashboard.
        </p>
        <div className="auth-highlight">
          <div>
            <p className="pill">Security</p>
            <h3>Encrypted access</h3>
          </div>
          <p className="muted">
            Account protection with role-based access and verification checks.
          </p>
        </div>
        <div className="auth-image">
          <img
            src="https://images.pexels.com/photos/6238012/pexels-photo-6238012.jpeg?cs=srgb&dl=pexels-gabby-k-6238012.jpg&fm=jpg"
            alt="Black university students collaborating"
            loading="lazy"
          />
        </div>
      </div>
      <div className="auth-form">
        <div className="glass-panel">
          <h2>Log in</h2>
          <p className="muted">Use your UG credentials or verified employer email.</p>
          
          {error && (
            <div className="alert alert-danger p-2 mb-3" style={{ fontSize: '0.9rem' }}>
              {error}
            </div>
          )}

          <form className="form" onSubmit={handleLogin}>
            <label>
              Email address
              <input 
                type="email" 
                placeholder="employer@ug.edu.gh or student@ug.edu.gh" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
            <label>
              Password
              <input 
                type="password" 
                placeholder="Enter password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
            <div className="form-row">
              <label className="checkbox">
                <input type="checkbox" />
                Keep me signed in
              </label>
              <span className="link">Forgot password?</span>
            </div>
            <button className="btn primary full" type="submit" disabled={loading}>
              {loading ? 'Logging in...' : 'Log in'}
            </button>
          </form>
          <div className="divider">or</div>
          <button className="btn ghost full" type="button">
            Continue with campus SSO
          </button>
          <p className="muted small">
            New here? <a href="/signup">Create a student profile</a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
