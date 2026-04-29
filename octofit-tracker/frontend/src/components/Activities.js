import React, { useState, useEffect } from 'react';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState(null);

  const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`;

  useEffect(() => {
    console.log('Activities: fetching from', apiUrl);
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        console.log('Activities: fetched data', data);
        setActivities(Array.isArray(data) ? data : data.results || []);
      })
      .catch(err => {
        console.error('Activities: fetch error', err);
        setError(err.message);
      });
  }, [apiUrl]);

  return (
    <div className="card octofit-card">
      <div className="card-header">&#127939; Activities</div>
      <div className="card-body p-0">
        {error && <div className="alert alert-danger m-3">{error}</div>}
        <table className="table table-striped table-hover octofit-table mb-0">
          <thead>
            <tr>
              <th>#</th>
              <th>User</th>
              <th>Activity Type</th>
              <th>Duration (min)</th>
            </tr>
          </thead>
          <tbody>
            {activities.length === 0 ? (
              <tr><td colSpan="4" className="text-center text-muted py-3">No activities found.</td></tr>
            ) : activities.map((activity, idx) => (
              <tr key={activity.id || idx}>
                <td><span className="badge bg-secondary octofit-badge">{idx + 1}</span></td>
                <td><strong>{activity.user}</strong></td>
                <td><span className="badge bg-info text-dark octofit-badge">{activity.activity_type}</span></td>
                <td>{activity.duration}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Activities;
