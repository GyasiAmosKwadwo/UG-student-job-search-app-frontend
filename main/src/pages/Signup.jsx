import { useState } from 'react'

function Signup() {
  const [role, setRole] = useState('student')
  const isStudent = role === 'student'

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
              className={`role ${isStudent ? 'active' : ''}`}
              onClick={() => setRole('student')}
              aria-pressed={isStudent}
            >
              Student
            </button>
            <button
              type="button"
              className={`role ${!isStudent ? 'active' : ''}`}
              onClick={() => setRole('employer')}
              aria-pressed={!isStudent}
            >
              Employer
            </button>
          </div>
          <form className="form">
            <label>
              Full name
              <input type="text" placeholder="Enter full name" />
            </label>
            <label>
              {isStudent ? 'University email' : 'Work email'}
              <input
                type="email"
                placeholder={isStudent ? 'name@ug.edu.gh' : 'name@company.com'}
              />
            </label>
            <label>
              Password
              <input type="password" placeholder="Create password" />
            </label>
            <label>
              Confirm password
              <input type="password" placeholder="Confirm password" />
            </label>
            <button className="btn primary full" type="button">
              Create account
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
