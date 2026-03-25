import React from 'react';

const StudentDashboard = () => {
  return (
    <div>
      <h2 className="mb-4">Welcome back!</h2>
      
      <div className="row g-4 mb-4">
        <div className="col-md-4">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-body">
              <h6 className="text-muted">Active Applications</h6>
              <h3 className="text-primary display-6">3</h3>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-body">
              <h6 className="text-muted">Saved Jobs</h6>
              <h3 className="text-primary display-6">12</h3>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-body">
              <h6 className="text-muted">Profile Completion</h6>
              <h3 className="text-success display-6">85%</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="card shadow-sm border-0">
        <div className="card-header bg-white">
          <h5 className="m-0 py-2">Recent Application Activity</h5>
        </div>
        <div className="card-body">
          <p className="text-muted">Your recent job applications will appear here.</p>
          {/* Functional table placeholder */}
          <table className="table table-hover mt-3">
            <thead>
              <tr>
                <th>Role</th>
                <th>Company</th>
                <th>Date Applied</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Research Assistant</td>
                <td>Data Lab</td>
                <td>Oct 12, 2023</td>
                <td><span className="badge bg-warning text-dark">Under Review</span></td>
              </tr>
              <tr>
                <td>Library Aide</td>
                <td>Campus Central Library</td>
                <td>Oct 10, 2023</td>
                <td><span className="badge bg-success">Interview Scheduled</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
