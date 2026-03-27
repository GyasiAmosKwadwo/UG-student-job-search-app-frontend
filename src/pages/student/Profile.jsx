import React from 'react';

const StudentProfile = () => {
  return (
    <div>
      <h3 className="mb-4">My Profile & CV</h3>
      <div className="row">
        <div className="col-md-4 mb-4">
          <div className="card shadow-sm border-0 text-center">
            <div className="card-body">
              <div 
                className="bg-secondary rounded-circle d-inline-block mb-3" 
                style={{ width: '100px', height: '100px' }}
              ></div>
              <h5>Richmond Duodu</h5>
              <p className="text-muted mb-2">3rd Year, Computer Science</p>
              <button className="btn btn-outline-primary btn-sm w-100">Upload New Photo</button>
            </div>
          </div>
        </div>
        <div className="col-md-8">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h5 className="mb-3">Personal Information</h5>
              <form>
                <div className="row mb-3">
                  <div className="col">
                    <label className="form-label">First Name</label>
                    <input type="text" className="form-control" defaultValue="Richmond" />
                  </div>
                  <div className="col">
                    <label className="form-label">Last Name</label>
                    <input type="text" className="form-control" defaultValue="Duodu" />
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label">Email Address</label>
                  <input type="email" className="form-control" defaultValue="richmond.duodu@ug.edu.gh" disabled />
                </div>
                <div className="mb-3">
                  <label className="form-label">Upload CV (PDF only)</label>
                  <input type="file" className="form-control" accept=".pdf" />
                </div>
                <div className="mb-3">
                  <label className="form-label">Skills (Comma separated)</label>
                  <input type="text" className="form-control" defaultValue="React, JavaScript, Python, Data Analysis" />
                </div>
                <button type="button" className="btn btn-primary">Save Changes</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
