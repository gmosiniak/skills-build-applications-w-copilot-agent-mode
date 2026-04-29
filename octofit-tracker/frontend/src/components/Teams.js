import React, { useState, useEffect } from 'react';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState(null);

  const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`;

  useEffect(() => {
    console.log('Teams: fetching from', apiUrl);
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        console.log('Teams: fetched data', data);
        setTeams(Array.isArray(data) ? data : data.results || []);
      })
      .catch(err => {
        console.error('Teams: fetch error', err);
        setError(err.message);
      });
  }, [apiUrl]);

  return (
    <div className="card octofit-card">
      <div className="card-header">&#127775; Teams</div>
      <div className="card-body p-0">
        {error && <div className="alert alert-danger m-3">{error}</div>}
        <table className="table table-striped table-hover octofit-table mb-0">
          <thead>
            <tr>
              <th>#</th>
              <th>Team Name</th>
            </tr>
          </thead>
          <tbody>
            {teams.length === 0 ? (
              <tr><td colSpan="2" className="text-center text-muted py-3">No teams found.</td></tr>
            ) : teams.map((team, idx) => (
              <tr key={team.id || idx}>
                <td><span className="badge bg-secondary octofit-badge">{idx + 1}</span></td>
                <td><strong>{team.name}</strong></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Teams;
