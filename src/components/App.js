import React, { useEffect, useState } from 'react';
import AppRouter from './AppRouter';
import { auth } from '../firebase';

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(auth.currentUser);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    })
  }, [])
  return (
    <>
      {init ? <AppRouter isLoggedIn={isLoggedIn} /> : 'Checking user auth state...'}
    </>
  );
}

export default App;
