import React, { useEffect } from 'react';

const Repositories = ({ repos, fetchRepos, subscribe, subscriptions }) => {
  useEffect(() => {
    fetchRepos();
  }, []);

  return (
    <div>
      <h2>Your Repositories</h2>
      <table border="1" cellPadding="8" cellSpacing="0">
        <thead>
          <tr>
            <th>Name</th>
            <th>Link</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {repos.map((repo) => (
            <tr key={repo.full_name}>
              <td>{repo.name}</td>
              <td>
                <a href={repo.html_url} target="_blank" rel="noreferrer">
                  View on GitHub
                </a>
              </td>
              <td
                style={{
                  color: subscriptions.has(repo.full_name) ? 'green' : 'red'
                }}
              >
                {subscriptions.has(repo.full_name)
                  ? 'Subscribed'
                  : 'Not Subscribed'}
              </td>
              <td>
                {!subscriptions.has(repo.full_name) && (
                  <button onClick={() => subscribe(repo.full_name)}>
                    Subscribe
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Repositories;
