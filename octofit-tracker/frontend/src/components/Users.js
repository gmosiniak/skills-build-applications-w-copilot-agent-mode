import React, { useState, useEffect } from 'react';

function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/users/`;

  useEffect(() => {
    console.log('Users: fetching from', apiUrl);
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        console.log('Users: fetched data', data);
        setUsers(Array.isArray(data) ? data : data.results || []);
      })
      .catch(err => {
        console.error('Users: fetch error', err);
        setError(err.message);
      });
  }, [apiUrl]);

  return (
    <div className="card octofit-card">
      <div className="card-header">&#128100; Users</div>
      <div className="card-body p-0">
        {error && <div className="alert alert-danger m-3">{error}</div>}
        <table className="table table-striped table-hover octofit-table mb-0">
          <thead>
            <tr>
              <th>#</th>
              <th>Username</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr><td colSpan="5" className="text-center text-muted py-3">No users found.</td></tr>
            ) : users.map((user, idx) => (
              <tr key={user.id || idx}>
                <td><span className="badge bg-secondary octofit-badge">{idx + 1}</span></td>
                <td><strong>{user.username}</strong></td>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td><a href={`mailto:${user.email}`} className="text-decoration-none">{user.email}</a></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Users;
