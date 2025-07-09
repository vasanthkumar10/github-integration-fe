import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = ({ profile, fetchProfile }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!profile) fetchProfile();
  }, []);

  if (!profile) return <p>Loading profile...</p>;

  return (
    <div>
      <h2>
        {profile.name} (@{profile.login})
      </h2>
      <img src={profile.avatar_url} alt="avatar" width={80} />
      <p>{profile.bio}</p>
      <p>
        Followers: {profile.followers} | Following: {profile.following}
      </p>
      <p>Public Repositories: {profile.public_repos}</p>
      <button onClick={() => navigate('/repos')} style={{ marginTop: '20px' }}>
        Go to Repositories
      </button>
    </div>
  );
};

export default Profile;
