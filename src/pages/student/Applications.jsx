import React from 'react';

const StudentApplications = () => {
  return (
    <div>
      <h3 className="mb-4">My Applications</h3>
      <div className="card shadow-sm border-0">
        <div className="card-body">
          <p className="text-muted">You have applied to 3 jobs. Keep it up!</p>
          <div className="table-responsive">
            <table className="table table-hover">
              <thead className="table-light">
                <tr>
                  <th>Job Title</th>
                  <th>Company</th>
                  <th>Date Applied</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Research Assistant</td>
                  <td>Data Lab</td>
                  <td>Oct 12, 2023</td>
                  <td><span className="badge bg-warning text-dark">Under Review</span></td>
                  <td><button className="btn btn-sm btn-outline-primary">View Details</button></td>
                </tr>
                <tr>
                  <td>Frontend Developer Intern</td>
                  <td>Tech Innovations</td>
                  <td>Oct 10, 2023</td>
                  <td><span className="badge bg-danger">Rejected</span></td>
                  <td><button className="btn btn-sm btn-outline-primary">View Details</button></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentApplications;
