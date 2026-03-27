import React from 'react';

const PostJob = () => {
  return (
    <div>
      <h3 className="mb-4">Post a New Job Offer</h3>
      
      <div className="card shadow-sm border-0">
        <div className="card-body p-4">
          <form>
            <div className="mb-3">
              <label className="form-label fw-bold">Job Title</label>
              <input type="text" className="form-control" placeholder="e.g. Campus Ambassador" />
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label fw-bold">Job Type</label>
                <select className="form-select">
                  <option>Part-time</option>
                  <option>Internship</option>
                  <option>Full-time / Graduate</option>
                  <option>Contract</option>
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label fw-bold">Location</label>
                <select className="form-select">
                  <option>On-Campus</option>
                  <option>Remote</option>
                  <option>Hybrid</option>
                  <option>Off-Campus Office</option>
                </select>
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">Job Description</label>
              <textarea className="form-control" rows="5" placeholder="Describe the responsibilities and requirements..."></textarea>
            </div>

            <div className="row mb-4">
              <div className="col-md-6">
                <label className="form-label fw-bold">Salary / Stipend (Optional)</label>
                <input type="text" className="form-control" placeholder="e.g. GHS 500 / month" />
              </div>
              <div className="col-md-6">
                <label className="form-label fw-bold">Application Deadline</label>
                <input type="date" className="form-control" />
              </div>
            </div>

            <div className="d-flex justify-content-end gap-2">
              <button type="button" className="btn btn-ghost">Save Draft</button>
              <button type="button" className="btn btn-primary">Publish Job Posting</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostJob;
