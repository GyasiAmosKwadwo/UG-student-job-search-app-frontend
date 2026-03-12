import { NavLink } from 'react-router-dom'

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'How It Works', to: '/#how' },
  { label: 'For Employers', to: '/#employers' },
  { label: 'Resources', to: '/#resources' },
]

function Navbar() {
  return (
    <header className="nav-shell">
      <nav className="nav">
        <NavLink to="/" className="brand">
          <span className="brand-mark">UG</span>
          <span className="brand-text">Campus Job Market</span>
        </NavLink>
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
      </nav>
    </header>
  )
}

export default Navbar
