import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';

const EmployerLayout = () => {
  return (
    <div className="d-flex" style={{ minHeight: '100vh' }}>
      {/* Sidebar Navigation */}
      <div className="bg-primary text-white p-3" style={{ width: '250px' }}>
        <h4 className="mb-4">Employer Portal</h4>
        <nav className="nav flex-column gap-2">
          <NavLink 
            to="/employer/dashboard" 
            className={({ isActive }) => `nav-link text-white ${isActive ? 'bg-dark rounded' : ''}`}
          >
            Dashboard
          </NavLink>
          <NavLink 
            to="/employer/jobs/manage" 
            className={({ isActive }) => `nav-link text-white ${isActive ? 'bg-dark rounded' : ''}`}
          >
            Manage Postings
          </NavLink>
          <NavLink 
            to="/employer/jobs/new" 
            className={({ isActive }) => `nav-link text-white ${isActive ? 'bg-dark rounded' : ''}`}
          >
            + Post New Job
          </NavLink>
          <hr className="bg-light" />
          <NavLink to="/" className="nav-link text-white mt-auto">
            &larr; Back to Home
          </NavLink>
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-grow-1 bg-light">
        {/* Top Header */}
        <header className="bg-white p-3 shadow-sm d-flex justify-content-between align-items-center">
          <h5 className="m-0 text-muted">UG CareerLink Employers</h5>
          <div className="d-flex align-items-center gap-3">
            <span className="text-muted">Data Lab HR</span>
            <button className="btn btn-outline-danger btn-sm">Logout</button>
          </div>
        </header>

        {/* This Outlet renders the specific nested route component */}
        <main className="p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default EmployerLayout;
