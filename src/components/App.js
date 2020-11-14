import React, { useEffect, useState, createContext } from 'react';
import AppRouter from './AppRouter';
import { auth } from '../firebase';

export const UserContext = createContext();

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(auth.currentUser);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserObj(user);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    })
  }, [])
  return (
    <UserContext.Provider value={userObj}>
      {init ? <AppRouter isLoggedIn={isLoggedIn} /> : 'Checking user auth state...'}
    </UserContext.Provider>
  );
}

export default App;
