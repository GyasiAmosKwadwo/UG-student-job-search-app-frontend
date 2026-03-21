import { NavLink, useNavigate } from 'react-router-dom'
import { clearAuth, getUser, isLoggedIn } from '../utils/auth.js'

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'How It Works', to: '/#how' },
  { label: 'For Employers', to: '/#employers' },
  { label: 'Resources', to: '/#resources' },
]

function Navbar() {
  const navigate = useNavigate()
  const loggedIn = isLoggedIn()
  const user = getUser()

  function handleLogout() {
    clearAuth()
    navigate('/', { replace: true })
  }

  return (
    <header className="nav-shell">
      <nav className="nav">
        <NavLink to="/" className="brand">
          <span className="brand-mark">UG</span>
          <span className="brand-text">UG CareerLink</span>
        </NavLink>

        {loggedIn ? (
          <>
            <div className="nav-links">
              {[
                { label: 'Dashboard', to: '/dashboard?tab=dashboard' },
                { label: 'Profile', to: '/dashboard?tab=profile' },
                { label: 'Messages', to: '/dashboard?tab=messages' },
              ].map((link) => (
                <NavLink key={link.label} className="nav-link" to={link.to}>
                  {link.label}
                </NavLink>
              ))}
              <button type="button" className="nav-link" onClick={handleLogout}>
                Logout
              </button>
            </div>
            <div className="nav-actions">
              <NavLink className="btn ghost" to="/dashboard?tab=saved">
                Saved
              </NavLink>
              <div className="nav-user">
                <span className="nav-user-avatar" aria-hidden="true">
                  {(user?.name || 'UG')
                    .split(/\s+/)
                    .filter(Boolean)
                    .slice(0, 2)
                    .map((p) => p[0]?.toUpperCase())
                    .join('') || 'UG'}
                </span>
                <div className="nav-user-copy">
                  <p className="nav-user-name">{user?.name || 'User'}</p>
                  <p className="nav-user-meta">{user?.email || 'UG CareerLink'}</p>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="nav-links">
              {navLinks.map((link) => (
                <a key={link.label} className="nav-link" href={link.to}>
                  {link.label}
                </a>
              ))}
            </div>
            <div className="nav-actions">
              <NavLink className="btn ghost" to="/login">
                Log in
              </NavLink>
              <NavLink className="btn primary" to="/signup">
                Get started
              </NavLink>
            </div>
          </>
        )}
      </nav>
    </header>
  )
}

export default Navbar
