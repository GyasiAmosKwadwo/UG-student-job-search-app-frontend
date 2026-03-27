import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Jobs', to: '/jobs' },
  { label: 'How It Works', to: '/#how' },
  { label: 'For Employers', to: '/#employers' },
  { label: 'Resources', to: '/#resources' },
]

function Navbar() {
  const { isAuthenticated, userRole, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="nav-shell">
      <nav className="nav">
        <NavLink to="/" className="brand">
          <span className="brand-mark">UG</span>
          <span className="brand-text">UG CareerLink</span>
        </NavLink>
        <div className="nav-links">
          {navLinks.map((link) => (
            <a 
              key={link.label} 
              className="nav-link" 
              href={link.to}
              onClick={(e) => {
                if (link.to.startsWith('/#')) {
                  const id = link.to.replace('/#', '');
                  const element = document.getElementById(id);
                  if (element) {
                    e.preventDefault();
                    element.scrollIntoView({ behavior: 'smooth' });
                    window.history.pushState(null, '', link.to);
                  }
                }
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
        <div className="nav-actions">
          {isAuthenticated ? (
            <>
              <NavLink className="btn ghost" to={`/${userRole}/dashboard`}>
                Dashboard
              </NavLink>
              <button className="btn primary" onClick={handleLogout}>
                Log out
              </button>
            </>
          ) : (
            <>
              <NavLink className="btn ghost" to="/login">
                Log in
              </NavLink>
              <NavLink className="btn primary" to="/signup">
                Get started
              </NavLink>
            </>
          )}
        </div>
      </nav>
    </header>
  )
}

export default Navbar
