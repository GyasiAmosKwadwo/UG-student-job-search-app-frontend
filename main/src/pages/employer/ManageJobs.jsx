import React from 'react';

const ManageJobs = () => {
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>Manage Active Postings</h3>
        <button className="btn btn-primary">+ Post New Job</button>
      </div>

      <div className="card shadow-sm border-0">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover">
              <thead className="table-light">
                <tr>
                  <th>Job Title</th>
                  <th>Posted Date</th>
                  <th>Applicants</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Research Assistant</strong></td>
                  <td>Oct 01, 2023</td>
                  <td>24</td>
                  <td><span className="badge bg-success">Active</span></td>
                  <td>
                    <button className="btn btn-sm btn-outline-primary me-2">Edit</button>
                    <button className="btn btn-sm btn-outline-danger">Close</button>
                  </td>
                </tr>
                <tr>
                  <td><strong>Data Analyst Intern</strong></td>
                  <td>Sept 15, 2023</td>
                  <td>45</td>
                  <td><span className="badge bg-secondary">Closed</span></td>
                  <td>
                    <button className="btn btn-sm btn-outline-primary me-2">View</button>
                    <button className="btn btn-sm btn-outline-success">Republish</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageJobs;
