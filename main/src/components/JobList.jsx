import React, { useState, useEffect } from "react";

const JobList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Note: 'https://ug-student-job.onrender.com/' currently serves the Swagger UI docs.
  // Be sure to append the actual API path (e.g., '/api/jobs/') to the fetch URL below.
  const API_URL = "https://ug-student-job.onrender.com/api/jobs/";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();

        // Adjust based on your API response structure (e.g., result.results if paginated)
        const jobs = Array.isArray(result) ? result : result.results || result.data || [];
        setData(jobs);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2 text-muted">Fetching job listings...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger" role="alert">
          <strong>Error:</strong> {error}
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="container mt-5">
        <div className="alert alert-info" role="alert">
          No jobs available right now.
        </div>
      </div>
    );
  }

  // Get dynamic table headers directly from the first item's keys (excluding some generic ones if you want)
  const tableHeaders = Object.keys(data[0] || {});

  return (
    <div className="container mt-5" style={{ minHeight: '60vh' }}>
      <h2 className="mb-4">Student Job Listings</h2>
      <div className="table-responsive">
        <table className="table table-striped table-hover table-bordered">
          <thead className="table-dark">
            <tr>
              {tableHeaders.map((header) => (
                <th key={header} scope="col">
                  {/* Capitalizes and replaces underscores with spaces. Example: "job_title" -> "Job title" */}
                  {header.charAt(0).toUpperCase() + header.slice(1).replace(/_/g, " ")}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={item.id || index}>
                {tableHeaders.map((key) => (
                  <td key={key}>
                    {/* Render objects/arrays as strings, or default to the value */}
                    {typeof item[key] === "object" && item[key] !== null
                      ? JSON.stringify(item[key])
                      : item[key]?.toString() || "-"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default JobList;
