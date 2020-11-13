import React, { useState } from 'react';
import AppRouter from './AppRouter';
import { auth } from '../firebase';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(auth.currentUser);
  return (
    <AppRouter isLoggedIn={isLoggedIn} />
  );
}

export default App;
