import React, { useState } from 'react';
import axios from 'axios';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Profile from './pages/Profile';
import Repositories from './pages/Repositories';

const App = () => {
  const [profile, setProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [subscriptions, setSubscriptions] = useState(new Set());
  const navigate = useNavigate();

  const fetchProfile = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/github/profile', {
        withCredentials: true
      });
      setProfile(res.data);
    } catch {
      setProfile(null);
    }
  };

  const fetchRepos = async () => {
    const res = await axios.get('http://localhost:8080/api/github/repos', {
      withCredentials: true
    });
    setRepos(res.data);
  };

  const subscribe = async (fullName) => {
    try {
      await axios.post(
        'http://localhost:8080/api/github/subscribe',
        { repoFullName: fullName },
        { withCredentials: true }
      );
      setSubscriptions((prev) => new Set(prev).add(fullName));
    } catch (err) {
      alert('Subscription failed');
    }
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div>
            <h1>GitHub Integration</h1>
            <a href="http://localhost:8080/api/github/login">
              <button>Login with GitHub</button>
            </a>
          </div>
        }
      />
      <Route
        path="/profile"
        element={<Profile profile={profile} fetchProfile={fetchProfile} />}
      />
      <Route
        path="/repos"
        element={
          <Repositories
            repos={repos}
            fetchRepos={fetchRepos}
            subscribe={subscribe}
            subscriptions={subscriptions}
          />
        }
      />
    </Routes>
  );
};

export default App;
