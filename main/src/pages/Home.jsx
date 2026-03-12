function Home() {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <p className="eyebrow">University of Ghana • Campus Job Market</p>
          <h1>
            A trusted campus marketplace for part-time work, internships, and
            real project experience.
          </h1>
          <p className="lead">
            Find opportunities that fit your schedule, build your profile once,
            and apply with confidence. Employers post verified roles and manage
            applications in a single streamlined workspace.
          </p>
          <div className="hero-actions">
            <a className="btn primary large" href="/signup">
              Create your profile
            </a>
            <a className="btn ghost large" href="/#how">
              See how it works
            </a>
          </div>
          <div className="hero-stats">
            <div>
              <p className="stat-value">120+</p>
              <p className="stat-label">Verified campus employers</p>
            </div>
            <div>
              <p className="stat-value">3,500+</p>
              <p className="stat-label">Student profiles</p>
            </div>
            <div>
              <p className="stat-value">95%</p>
              <p className="stat-label">Application completion rate</p>
            </div>
          </div>
        </div>
        <div className="hero-card">
          <div className="glass-panel">
            <div className="card-header">
              <div>
                <p className="card-title">Opportunity Spotlight</p>
                <p className="muted">Science & Technology</p>
              </div>
              <span className="pill">New</span>
            </div>
            <h3>Research Assistant • Data Lab</h3>
            <p className="muted">
              Work with faculty on real-time campus analytics. Flexible schedule
              and mentorship included.
            </p>
            <div className="card-meta">
              <span>Part-time</span>
              <span>Hybrid</span>
              <span>Weekly stipend</span>
            </div>
            <button className="btn primary full">Apply now</button>
          </div>
        </div>
      </section>

      <section className="section" id="how">
        <div className="section-header">
          <p className="eyebrow">How it works</p>
          <h2>Designed for speed, clarity, and trust.</h2>
          <p className="lead muted">
            Every feature is focused on reducing friction between students and
            campus employers while keeping workflows structured and secure.
          </p>
        </div>
        <div className="grid three">
          {[
            {
              title: 'Build a smart profile',
              copy: 'Upload your CV, highlight skills, and set availability once.',
            },
            {
              title: 'Apply with intent',
              copy: 'Track deadlines, status updates, and employer feedback in one view.',
            },
            {
              title: 'Hire with confidence',
              copy: 'Verify applicants, shortlist quickly, and manage interview slots.',
            },
          ].map((item) => (
            <article key={item.title} className="feature-card">
              <h3>{item.title}</h3>
              <p className="muted">{item.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section split" id="employers">
        <div>
          <p className="eyebrow">For employers</p>
          <h2>Publish roles in minutes and manage applicants effortlessly.</h2>
          <p className="lead muted">
            Post openings, filter candidates, and schedule interviews with built-in
            tools tailored to campus hiring.
          </p>
          <div className="checklist">
            <span>Verified employer onboarding</span>
            <span>Role templates and approval flows</span>
            <span>Analytics for posting performance</span>
          </div>
        </div>
        <div className="stacked-cards">
          <div className="glass-panel small">
            <p className="pill">Applicant summary</p>
            <h3>20 new applications</h3>
            <p className="muted">Shortlist candidates by availability and skills.</p>
          </div>
          <div className="glass-panel small accent">
            <p className="pill">Interview slots</p>
            <h3>Bookable schedule</h3>
            <p className="muted">Auto-sync with campus calendar policies.</p>
          </div>
        </div>
      </section>

      <section className="section" id="resources">
        <div className="section-header">
          <p className="eyebrow">Student advantage</p>
          <h2>Grow skills with guided support and verified roles.</h2>
        </div>
        <div className="grid two">
          <div className="feature-card wide">
            <h3>Career readiness tracks</h3>
            <p className="muted">
              Curated learning journeys aligned to UG career services guidance.
            </p>
          </div>
          <div className="feature-card wide">
            <h3>Trusted listings</h3>
            <p className="muted">
              Every employer is vetted to keep student opportunities safe and fair.
            </p>
          </div>
        </div>
      </section>

      <section className="cta">
        <div>
          <h2>Ready to unlock campus opportunities?</h2>
          <p className="lead muted">
            Join the platform built for UG students, employers, and campus
            leadership.
          </p>
        </div>
        <div className="cta-actions">
          <a className="btn primary large" href="/signup">
            Start now
          </a>
          <a className="btn ghost large" href="/login">
            Log in
          </a>
        </div>
      </section>
    </div>
  )
}

export default Home
