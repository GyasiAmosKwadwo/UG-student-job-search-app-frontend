const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: 'speed' },
  { id: 'applications', label: 'My Applications', icon: 'briefcase' },
  { id: 'saved', label: 'Saved Jobs', icon: 'bookmark' },
  { id: 'profile', label: 'Profile', icon: 'user' },
  { id: 'resources', label: 'Available Jobs', icon: 'compass' },
]

function Icon({ name }) {
  const common = {
    width: 20,
    height: 20,
    viewBox: '0 0 24 24',
    fill: 'none',
    xmlns: 'http://www.w3.org/2000/svg',
  }

  if (name === 'briefcase') {
    return (
      <svg {...common}>
        <path
          d="M9 6a3 3 0 0 1 3-3h0a3 3 0 0 1 3 3v2H9V6Z"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <path
          d="M4 9.5A2.5 2.5 0 0 1 6.5 7h11A2.5 2.5 0 0 1 20 9.5v8A2.5 2.5 0 0 1 17.5 20h-11A2.5 2.5 0 0 1 4 17.5v-8Z"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <path
          d="M8 12h8"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    )
  }

  if (name === 'bookmark') {
    return (
      <svg {...common}>
        <path
          d="M7 4.5A2.5 2.5 0 0 1 9.5 2h5A2.5 2.5 0 0 1 17 4.5V21l-5-3-5 3V4.5Z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </svg>
    )
  }

  if (name === 'compass') {
    return (
      <svg {...common}>
        <path
          d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <path
          d="M14.8 9.2 13.5 13.5 9.2 14.8 10.5 10.5l4.3-1.3Z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </svg>
    )
  }

  if (name === 'user') {
    return (
      <svg {...common}>
        <path
          d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Z"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <path
          d="M4.5 20a7.5 7.5 0 0 1 15 0"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    )
  }

  return (
    <svg {...common}>
      <path
        d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M12 12V6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M12 12 16.5 14"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  )
}

function DashboardNav({ active, onChange, isOpen, onClose }) {
  return (
    <aside className={`dash-sidebar ${isOpen ? 'open' : ''}`}>
      <div className="dash-sidebar-head">
        <p className="dash-sidebar-title">Workspace</p>
        <button type="button" className="dash-sidebar-close" onClick={onClose}>
          <span className="sr-only">Close navigation</span>
          <span aria-hidden="true">×</span>
        </button>
      </div>
      <nav className="dash-nav">
        {navItems.map((item) => {
          const selected = item.id === active
          return (
            <button
              key={item.id}
              type="button"
              className={`dash-nav-item ${selected ? 'active' : ''}`}
              onClick={() => onChange(item.id)}
            >
              <span className="dash-nav-icon" aria-hidden="true">
                <Icon name={item.icon} />
              </span>
              <span>{item.label}</span>
            </button>
          )
        })}
      </nav>
    </aside>
  )
}

export default DashboardNav
