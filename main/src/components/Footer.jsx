function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div>
          <p className="footer-brand">University of Ghana Campus Job Market</p>
          <p className="muted">
            Building structured access to campus opportunities for students and
            trusted employers.
          </p>
        </div>
        <div className="footer-columns">
          <div>
            <p className="footer-title">Platform</p>
            <a href="/#how">How it works</a>
            <a href="/#roles">Roles</a>
            <a href="/#security">Security</a>
          </div>
          <div>
            <p className="footer-title">Resources</p>
            <a href="/#resources">Career guides</a>
            <a href="/#events">Campus events</a>
            <a href="/#faq">FAQ</a>
          </div>
          <div>
            <p className="footer-title">Contact</p>
            <span className="muted">jobs@ug.edu.gh</span>
            <span className="muted">Legon, Accra</span>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 University of Ghana</span>
        <span>Privacy • Terms • Accessibility</span>
      </div>
    </footer>
  )
}

export default Footer
