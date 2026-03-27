import React from 'react';
import JobList from '../components/JobList';

function Jobs() {
  return (
    <div className="jobs-page" style={{ padding: '2rem 5%' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>Find Your Next Opportunity</h1>
        <p style={{ color: 'var(--text-muted)' }}>Browse through verified roles posted by campus employers.</p>
      </div>
      <JobList />
    </div>
  );
}

export default Jobs;
