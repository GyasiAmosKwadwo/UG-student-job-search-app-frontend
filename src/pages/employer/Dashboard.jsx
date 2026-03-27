import React from 'react';

const EmployerDashboard = () => {
  return (
    <div>
      <h2 className="mb-4">Employer Overview</h2>
      
      <div className="row g-4 mb-4">
        <div className="col-md-4">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-body">
              <h6 className="text-muted">Active Job Postings</h6>
              <h3 className="text-primary display-6">2</h3>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-body">
              <h6 className="text-muted">New Applicants</h6>
              <h3 className="text-primary display-6">24</h3>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-body">
              <h6 className="text-muted">Interviews Scheduled</h6>
              <h3 className="text-success display-6">5</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="card shadow-sm border-0">
        <div className="card-header bg-white d-flex justify-content-between align-items-center">
          <h5 className="m-0 py-2">Recent Applicants</h5>
          <button className="btn btn-sm btn-primary">View All</button>
        </div>
        <div className="card-body">
          {/* Functional list placeholder */}
          <ul className="list-group list-group-flush">
            <li className="list-group-item d-flex justify-content-between align-items-center px-0">
              <div>
                <strong>Richmond Duodu</strong> applied for <em>Research Assistant</em>
                <br/><small className="text-muted">2 hours ago</small>
              </div>
              <button className="btn btn-sm btn-outline-secondary">Review CV</button>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center px-0">
              <div>
                <strong>Richmond Duodu</strong> applied for <em>TA - Intro to CompSci</em>
                <br/><small className="text-muted">1 day ago</small>
              </div>
              <button className="btn btn-sm btn-outline-secondary">Review CV</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EmployerDashboard;
