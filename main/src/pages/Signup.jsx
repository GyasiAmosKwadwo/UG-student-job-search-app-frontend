import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const navigate = useNavigate();
  const [role, setRole] = useState('student');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    setError('');
    setLoading(true);

    const REGISTER_URL = 'https://ug-student-job.onrender.com/api/register/';

    try {
      const response = await fetch(REGISTER_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username,
          email,
          password,
          role
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        // Attempt to extract the first error string from the Django DRF object
        const errorMsg = errorData ? Object.values(errorData)[0] : 'Registration failed. Try again.';
        throw new Error(Array.isArray(errorMsg) ? errorMsg[0] : (typeof errorMsg === 'string' ? errorMsg : 'Invalid submission'));
      }

      // If successful, take them to the login screen
      navigate('/login');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="auth">
      <div className="auth-panel">
        <p className="eyebrow">Get started</p>
        <h1>Build your profile with UG CareerLink.</h1>
        <p className="lead muted">
          Students and employers get tailored experiences with structured
          onboarding and guided profile setup.
        </p>
        <div className="auth-highlight">
          <div>
            <p className="pill">Smart matching</p>
            <h3>Opportunities that fit your schedule</h3>
          </div>
          <p className="muted">
            Tell us your interests and availability to receive relevant listings.
          </p>
        </div>
        <div className="auth-image">
          <img
            src="https://images.pexels.com/photos/5538578/pexels-photo-5538578.jpeg?cs=srgb&dl=pexels-zen-chung-5538578.jpg&fm=jpg"
            alt="Black student reading a notebook"
            loading="lazy"
          />
        </div>
      </div>
      <div className="auth-form">
        <div className="glass-panel">
          <h2>Create account</h2>
          <p className="muted">Join as a student or verified employer.</p>
          <div className="role-picker">
            <button 
              type="button" 
              className={`role ${role === 'student' ? 'active' : ''}`}
              onClick={() => setRole('student')}
            >
              Student
            </button>
            <button 
              type="button" 
              className={`role ${role === 'employer' ? 'active' : ''}`}
              onClick={() => setRole('employer')}
            >
              Employer
            </button>
          </div>
          
          {error && (
            <div className="alert alert-danger p-2 mb-3 mt-3" style={{ fontSize: '0.9rem' }}>
              {error}
            </div>
          )}

          <form className="form" onSubmit={handleSignup}>
            <label>
              Username
              <input 
                type="text" 
                placeholder="Enter a unique username" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </label>
            <label>
              Email address
              <input 
                type="email" 
                placeholder="name@ug.edu.gh" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
            <label>
              Password
              <input 
                type="password" 
                placeholder="Create password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
            <label>
              Confirm password
              <input 
                type="password" 
                placeholder="Confirm password" 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </label>
            <button className="btn primary full" type="submit" disabled={loading}>
              {loading ? 'Creating account...' : 'Create account'}
            </button>
          </form>
          <p className="muted small">
            Already have an account? <a href="/login">Log in</a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Signup
