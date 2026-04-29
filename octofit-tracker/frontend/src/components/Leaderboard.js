import React, { useState, useEffect } from 'react';

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [error, setError] = useState(null);

  const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`;

  useEffect(() => {
    console.log('Leaderboard: fetching from', apiUrl);
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        console.log('Leaderboard: fetched data', data);
        setLeaderboard(Array.isArray(data) ? data : data.results || []);
      })
      .catch(err => {
        console.error('Leaderboard: fetch error', err);
        setError(err.message);
      });
  }, [apiUrl]);

  const medals = ['&#127947;', '&#129352;', '&#129353;'];

  return (
    <div className="card octofit-card">
      <div className="card-header">&#127942; Leaderboard</div>
      <div className="card-body p-0">
        {error && <div className="alert alert-danger m-3">{error}</div>}
        <table className="table table-striped table-hover octofit-table mb-0">
          <thead>
            <tr>
              <th>Rank</th>
              <th>User</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.length === 0 ? (
              <tr><td colSpan="3" className="text-center text-muted py-3">No leaderboard data found.</td></tr>
            ) : leaderboard.map((entry, idx) => (
              <tr key={entry.id || idx}>
                <td>
                  {idx < 3
                    ? <span dangerouslySetInnerHTML={{ __html: medals[idx] }} />
                    : <span className="badge bg-secondary octofit-badge">{idx + 1}</span>}
                </td>
                <td><strong>{entry.user}</strong></td>
                <td><span className="badge bg-success octofit-badge">{entry.points} pts</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Leaderboard;
