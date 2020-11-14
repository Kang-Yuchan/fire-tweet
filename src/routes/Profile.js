import React from 'react';
import { useHistory } from 'react-router-dom';
import { auth } from '../firebase';

const Profile = () => {
  const history = useHistory();
  const logout = () => {
    auth.signOut();
    history.push('/');
  };

  return (
    <div>
      <button type="button" onClick={logout}>log out</button>
    </div>
  )
};

export default Profile;
