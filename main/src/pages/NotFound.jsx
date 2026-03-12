function NotFound() {
  return (
    <div className="notfound">
      <div className="notfound-card">
        <p className="eyebrow">404</p>
        <h1>We could not find that page.</h1>
        <p className="lead muted">
          The page may have moved or the link is outdated. Head back to
          UG CareerLink to continue.
        </p>
        <div className="hero-actions">
          <a className="btn primary" href="/">
            Go to homepage
          </a>
          <a className="btn ghost" href="/login">
            Log in
          </a>
        </div>
      </div>
    </div>
  )
}

export default NotFound
