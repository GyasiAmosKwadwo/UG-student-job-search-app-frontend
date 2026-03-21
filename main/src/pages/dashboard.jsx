import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import DashboardNav from '../components/dashboardnav.jsx'
import { getAuth, setAuth, clearAuth, getUser } from '../utils/auth.js'

const EMPLOYER_JOBS_STORAGE_KEY = 'ugcl_employer_jobs_v1'

const mockJobs = [
  {
    id: 'job-graphic-design-assistant',
    category: 'Creative & Media',
    title: 'Graphic Design Assistant',
    org: 'Campus Design Dept',
    tags: ['Part-time', 'Hybrid'],
    pay: '18cedis-20cedis / hour',
    image:
      'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?cs=srgb&dl=pexels-thisisengineering-3861969.jpg&fm=jpg',
  },
  {
    id: 'job-laboratory-assistant',
    category: 'Science & Research',
    title: 'Laboratory Assistant',
    org: 'Science Research Center',
    tags: ['Part-time', 'Hybrid'],
    pay: '$15 / hour',
    image:
      'https://images.pexels.com/photos/3861966/pexels-photo-3861966.jpeg?cs=srgb&dl=pexels-thisisengineering-3861966.jpg&fm=jpg',
  },
  {
    id: 'job-student-mentor',
    category: 'Student Support',
    title: 'Student Mentor',
    org: 'Academic Success Unit',
    tags: ['Flexible', 'On-campus'],
    pay: 'Stipend',
    image:
      'https://images.pexels.com/photos/5212329/pexels-photo-5212329.jpeg?cs=srgb&dl=pexels-ketut-subiyanto-5212329.jpg&fm=jpg',
  },
]

function initialsFromName(name) {
  if (!name) return 'UG'
  const parts = String(name).trim().split(/\s+/).filter(Boolean)
  const [first, second] = parts
  const raw = `${(first?.[0] ?? '').toUpperCase()}${(second?.[0] ?? '').toUpperCase()}`
  return raw || String(name).slice(0, 2).toUpperCase()
}

function safeParseJson(raw, fallback) {
  try {
    if (!raw) return fallback
    return JSON.parse(raw)
  } catch {
    return fallback
  }
}

function parseEmployerJobs(raw) {
  const parsed = safeParseJson(raw, [])
  return Array.isArray(parsed) ? parsed : []
}

function profileStorageKey(email) {
  const safe = String(email || '').trim().toLowerCase()
  return safe ? `ugcl_profile_v1:${safe}` : 'ugcl_profile_v1:anonymous'
}

function Dashboard() {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const tab = searchParams.get('tab') || 'dashboard'

  const user = getUser() || { name: 'Student', email: '' }
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [jobQuery, setJobQuery] = useState('')
  const [profileSavedAt, setProfileSavedAt] = useState(null)
  const [employerJobs, setEmployerJobs] = useState(() =>
    parseEmployerJobs(localStorage.getItem(EMPLOYER_JOBS_STORAGE_KEY)),
  )

  const [applications] = useState(() =>
    safeParseJson(localStorage.getItem('ugcl_applications_v1'), []),
  )
  const [savedJobs, setSavedJobs] = useState(() =>
    safeParseJson(localStorage.getItem('ugcl_saved_jobs_v1'), []),
  )

  const [profile, setProfile] = useState(() => {
    return safeParseJson(localStorage.getItem(profileStorageKey(user.email)), {
      firstName: '',
      lastName: '',
      age: '',
      specialty: '',
      experience: '',
      course: '',
      phone: '',
      email: user.email || '',
    })
  })

  useEffect(() => {
    localStorage.setItem('ugcl_applications_v1', JSON.stringify(applications))
  }, [applications])

  useEffect(() => {
    localStorage.setItem('ugcl_saved_jobs_v1', JSON.stringify(savedJobs))
  }, [savedJobs])

  useEffect(() => {
    localStorage.setItem(profileStorageKey(user.email), JSON.stringify(profile))
  }, [profile, user.email])

  useEffect(() => {
    function handleStorage(e) {
      if (e?.key !== EMPLOYER_JOBS_STORAGE_KEY) return
      setEmployerJobs(parseEmployerJobs(e.newValue))
    }

    window.addEventListener('storage', handleStorage)
    return () => window.removeEventListener('storage', handleStorage)
  }, [])

  const counts = useMemo(() => {
    const bucket = { applied: 0, review: 0, interview: 0 }
    for (const item of applications) {
      if (item?.status === 'applied') bucket.applied += 1
      if (item?.status === 'review') bucket.review += 1
      if (item?.status === 'interview') bucket.interview += 1
    }
    return bucket
  }, [applications])

  const filteredJobs = useMemo(() => {
    const q = jobQuery.trim().toLowerCase()
    if (!q) return mockJobs
    return mockJobs.filter((job) => {
      return (
        job.title.toLowerCase().includes(q) ||
        job.org.toLowerCase().includes(q) ||
        job.category.toLowerCase().includes(q)
      )
    })
  }, [jobQuery])

  function refreshEmployerJobs() {
    setEmployerJobs(parseEmployerJobs(localStorage.getItem(EMPLOYER_JOBS_STORAGE_KEY)))
  }

  function setTab(nextTab) {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev)
      next.set('tab', nextTab)
      return next
    })
    if (nextTab === 'resources') refreshEmployerJobs()
    setSidebarOpen(false)
  }

  function toggleSaved(jobId) {
    setSavedJobs((prev) => {
      const has = prev.includes(jobId)
      if (has) return prev.filter((id) => id !== jobId)
      return [...prev, jobId]
    })
  }

  function handleLogout() {
    clearAuth()
    navigate('/', { replace: true })
  }

  function handleProfileSave(e) {
    e?.preventDefault?.()
    setProfileSavedAt(new Date())

    const auth = getAuth()
    if (auth?.loggedIn) {
      const first = String(profile.firstName || '').trim()
      const last = String(profile.lastName || '').trim()
      const displayName = [first, last].filter(Boolean).join(' ') || auth.user?.name

      setAuth({
        ...auth,
        user: {
          ...(auth.user || {}),
          name: displayName || auth.user?.name || 'User',
          email: String(profile.email || auth.user?.email || '').trim().toLowerCase(),
        },
      })
    }
  }

  return (
    <div className="dashboard">
      <div className="dash-layout">
        <div
          className={`dash-overlay ${sidebarOpen ? 'open' : ''}`}
          role="presentation"
          onClick={() => setSidebarOpen(false)}
        />
        <DashboardNav
          active={tab}
          onChange={setTab}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <section className="dash-main">
          <div className="dash-top">
            <button
              type="button"
              className="dash-menu"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open navigation</span>
              <span aria-hidden="true">☰</span>
            </button>

            <div className="dash-user">
              <span className="dash-avatar" aria-hidden="true">
                {initialsFromName(user.name)}
              </span>
              <div>
                <p className="dash-user-name">{user.name}</p>
                <p className="dash-user-meta">{user.email || 'UG CareerLink'}</p>
              </div>
              <button type="button" className="dash-logout" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>

          {tab === 'dashboard' && (
            <>
              <header className="dash-hero">
                <div className="dash-hero-copy">
                  <h1 className="dash-title">
                    Welcome back, <span>{user.name}!</span>
                  </h1>
                  <p className="dash-subtitle">
                    Explore opportunities and manage your applications.
                  </p>
                </div>
              </header>

              <div className="dash-grid">
                <article className="dash-card">
                  <div className="dash-card-head">
                    <div>
                      <h2>My Applications</h2>
                      <p className="muted small">Your current pipeline at a glance.</p>
                    </div>
                    <button type="button" className="dash-ghost">
                      <span className="sr-only">More actions</span>
                      <span aria-hidden="true">⋯</span>
                    </button>
                  </div>

                  <div className="dash-tabs">
                    <button type="button" className="dash-tab active">
                      <span className="dash-tab-count">{counts.applied}</span>
                      <span>Applied</span>
                    </button>
                    <button type="button" className="dash-tab">
                      <span className="dash-tab-count">{counts.review}</span>
                      <span>Under Review</span>
                    </button>
                    <button type="button" className="dash-tab">
                      <span className="dash-tab-count">{counts.interview}</span>
                      <span>Interview</span>
                    </button>
                  </div>

                  <div className="dash-card-body">
                    {applications.length === 0 ? (
                      <div className="dash-empty">
                        <p className="dash-empty-title">
                          No applications available at the moment
                        </p>
                        <p className="muted">
                          When you apply to jobs, they will appear here with status
                          updates.
                        </p>
                        <button
                          type="button"
                          className="btn primary"
                          onClick={() => setTab('saved')}
                        >
                          Browse saved jobs
                        </button>
                      </div>
                    ) : (
                      <div className="dash-list">
                        {applications.slice(0, 3).map((app) => (
                          <div key={app.id} className="dash-row">
                            <div>
                              <p className="dash-row-title">{app.title}</p>
                              <p className="muted small">{app.org}</p>
                            </div>
                            <span className="dash-status">{app.status}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </article>

                <article className="dash-card">
                  <div className="dash-card-head">
                    <div>
                      <h2>Recommended Jobs</h2>
                      <p className="muted small">Curated based on your profile.</p>
                    </div>
                    <button type="button" className="dash-link" onClick={() => setTab('saved')}>
                      View all <span aria-hidden="true">›</span>
                    </button>
                  </div>

                  <div className="dash-search">
                    <span aria-hidden="true" className="dash-search-icon">
                      ⌕
                    </span>
                    <input
                      value={jobQuery}
                      onChange={(e) => setJobQuery(e.target.value)}
                      placeholder="Search for jobs..."
                      aria-label="Search for jobs"
                    />
                  </div>

                  <div className="dash-jobs">
                    {filteredJobs.map((job) => {
                      const isSaved = savedJobs.includes(job.id)
                      return (
                        <div key={job.id} className="job-card">
                          <div className="job-thumb">
                            <img src={job.image} alt="" loading="lazy" />
                            <span className="job-chip">{job.category}</span>
                            <button
                              type="button"
                              className={`job-save ${isSaved ? 'saved' : ''}`}
                              onClick={() => toggleSaved(job.id)}
                              aria-label={isSaved ? 'Remove from saved jobs' : 'Save job'}
                            >
                              <span aria-hidden="true">⟡</span>
                            </button>
                          </div>
                          <div className="job-body">
                            <div>
                              <p className="job-title">{job.title}</p>
                              <p className="muted">{job.org}</p>
                              <p className="muted small">
                                {job.tags.join(' - ')} · {job.pay}
                              </p>
                            </div>
                            <div className="job-actions">
                              <button type="button" className="btn ghost">
                                View status
                              </button>
                              <button
                                type="button"
                                className={`btn ${isSaved ? 'primary' : ''}`}
                                onClick={() => toggleSaved(job.id)}
                              >
                                {isSaved ? 'Saved' : 'Save'}
                              </button>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </article>
              </div>

              <section className="dash-kickers">
                <div className="dash-mini">
                  <p className="pill">Next step</p>
                  <h3>Complete your profile</h3>
                  <p className="muted">
                    Add your skills and availability to unlock better job matches.
                  </p>
                  <button
                    type="button"
                    className="btn primary"
                    onClick={() => setTab('profile')}
                  >
                    Update profile
                  </button>
                </div>
                <div className="dash-mini">
                  <p className="pill">Tip</p>
                  <h3>Track deadlines weekly</h3>
                  <p className="muted">
                    Review your applications every Monday to stay ahead of interview
                    requests.
                  </p>
                  <button
                     type="button"
                     className="btn ghost"
                     onClick={() => setTab('resources')}
                   >
                     View available jobs
                   </button>
                 </div>
               </section>
             </>
          )}

          {tab === 'applications' && (
            <div className="dash-section">
              <h1 className="dash-section-title">My Applications</h1>
              <div className="dash-tabs compact">
                <div className="dash-pill">
                  <span className="dash-pill-num">{counts.applied}</span> Applied
                </div>
                <div className="dash-pill">
                  <span className="dash-pill-num">{counts.review}</span> Under Review
                </div>
                <div className="dash-pill">
                  <span className="dash-pill-num">{counts.interview}</span> Interview
                </div>
              </div>

              {applications.length === 0 ? (
                <div className="dash-empty large">
                  <p className="dash-empty-title">
                    No applications available at the moment
                  </p>
                  <p className="muted">
                    Apply to a job to start tracking statuses here.
                  </p>
                  <button type="button" className="btn primary" onClick={() => setTab('saved')}>
                    Find jobs
                  </button>
                </div>
              ) : (
                <div className="dash-list">
                  {applications.map((app) => (
                    <div key={app.id} className="dash-row">
                      <div>
                        <p className="dash-row-title">{app.title}</p>
                        <p className="muted small">{app.org}</p>
                      </div>
                      <span className="dash-status">{app.status}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {tab === 'saved' && (
            <div className="dash-section">
              <h1 className="dash-section-title">Saved Jobs</h1>
              {savedJobs.length === 0 ? (
                <div className="dash-empty large">
                  <p className="dash-empty-title">No saved jobs yet</p>
                  <p className="muted">
                    Save roles you like so you can apply later from one place.
                  </p>
                </div>
              ) : (
                <div className="dash-list">
                  {mockJobs
                    .filter((job) => savedJobs.includes(job.id))
                    .map((job) => (
                      <div key={job.id} className="dash-row">
                        <div>
                          <p className="dash-row-title">{job.title}</p>
                          <p className="muted small">
                            {job.org} · {job.pay}
                          </p>
                        </div>
                        <button
                          type="button"
                          className="btn ghost"
                          onClick={() => toggleSaved(job.id)}
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                </div>
              )}
            </div>
          )}

          {tab === 'resources' && (
            <div className="dash-section">
              <h1 className="dash-section-title">Available Jobs</h1>
              {employerJobs.length === 0 ? (
                <div className="dash-empty large" style={{ marginTop: 18 }}>
                  <p className="dash-empty-title">No jobs available</p>
                  <p className="muted">
                    When an employer posts a job, it will appear here.
                  </p>
                </div>
              ) : (
                <div className="dash-list" style={{ marginTop: 18 }}>
                  {employerJobs.map((job, index) => {
                    const key = job?.id || job?._id || `${job?.title || 'job'}:${index}`
                    const title = job?.title || job?.role || job?.position || 'Untitled job'
                    const org = job?.org || job?.company || job?.employer || job?.employerName || ''
                    const pay = job?.pay || job?.salary || job?.compensation || ''
                    const location = job?.location || job?.workMode || ''

                    return (
                      <div key={key} className="dash-row">
                        <div>
                          <p className="dash-row-title">{title}</p>
                          <p className="muted small">
                            {[org, location, pay].filter(Boolean).join(' · ') || 'Employer post'}
                          </p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          )}

          {tab === 'profile' && (
            <div className="dash-section">
              <h1 className="dash-section-title">Profile</h1>
              <p className="muted" style={{ marginTop: 10 }}>
                Update your details to improve job recommendations and application tracking.
              </p>

              {profileSavedAt ? (
                <p className="dash-note" role="status">
                  Profile updated.
                </p>
              ) : null}

              <form className="form dash-form" onSubmit={handleProfileSave}>
                <div className="dash-form-grid">
                  <label>
                    First name <span className="dash-required">*</span>
                    <input
                      value={profile.firstName}
                      onChange={(e) =>
                        setProfile((prev) => ({ ...prev, firstName: e.target.value }))
                      }
                      type="text"
                      placeholder="Enter first name"
                      required
                      autoComplete="given-name"
                    />
                  </label>

                  <label>
                    Last name <span className="dash-required">*</span>
                    <input
                      value={profile.lastName}
                      onChange={(e) =>
                        setProfile((prev) => ({ ...prev, lastName: e.target.value }))
                      }
                      type="text"
                      placeholder="Enter last name"
                      required
                      autoComplete="family-name"
                    />
                  </label>

                  <label>
                    Age <span className="dash-required">*</span>
                    <input
                      value={profile.age}
                      onChange={(e) => setProfile((prev) => ({ ...prev, age: e.target.value }))}
                      type="number"
                      min="10"
                      max="120"
                      placeholder="Enter age"
                      required
                      inputMode="numeric"
                    />
                  </label>

                  <label>
                    Phone number <span className="dash-required">*</span>
                    <input
                      value={profile.phone}
                      onChange={(e) =>
                        setProfile((prev) => ({ ...prev, phone: e.target.value }))
                      }
                      type="tel"
                      placeholder="+233 50 000 0000"
                      required
                      autoComplete="tel"
                    />
                  </label>

                  <label>
                    Email
                    <input
                      value={profile.email}
                      onChange={(e) =>
                        setProfile((prev) => ({ ...prev, email: e.target.value }))
                      }
                      type="email"
                      placeholder="name@ug.edu.gh"
                      autoComplete="email"
                    />
                  </label>

                  <label>
                    Course
                    <input
                      value={profile.course}
                      onChange={(e) =>
                        setProfile((prev) => ({ ...prev, course: e.target.value }))
                      }
                      type="text"
                      placeholder="e.g. Computer Science"
                    />
                  </label>

                  <label>
                    Specialty
                    <input
                      value={profile.specialty}
                      onChange={(e) =>
                        setProfile((prev) => ({ ...prev, specialty: e.target.value }))
                      }
                      type="text"
                      placeholder="e.g. UI/UX, Data Analysis"
                    />
                  </label>

                  <label>
                    Experience
                    <input
                      value={profile.experience}
                      onChange={(e) =>
                        setProfile((prev) => ({ ...prev, experience: e.target.value }))
                      }
                      type="text"
                      placeholder="e.g. 1 year, Internship"
                    />
                  </label>
                </div>

                <div className="dash-form-actions">
                  <button
                    type="submit"
                    className="btn primary"
                    disabled={
                      !String(profile.firstName || '').trim() ||
                      !String(profile.lastName || '').trim() ||
                      !String(profile.age || '').trim() ||
                      !String(profile.phone || '').trim()
                    }
                  >
                    Save profile
                  </button>
                  <button
                    type="button"
                    className="btn ghost"
                    onClick={() => setTab('dashboard')}
                  >
                    Back to dashboard
                  </button>
                </div>
              </form>
            </div>
          )}

          {tab === 'messages' && (
            <div className="dash-section">
              <h1 className="dash-section-title">Messages</h1>
              <div className="dash-empty large" style={{ marginTop: 18 }}>
                <p className="dash-empty-title">No messages yet</p>
                <p className="muted">
                  Employer updates and interview invites will appear here.
                </p>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}

export default Dashboard
