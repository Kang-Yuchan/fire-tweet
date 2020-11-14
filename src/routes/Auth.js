import React, { useState } from 'react';
import { auth, firebaseInstance } from '../firebase';

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");

  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    if (name === 'email') {
      return setEmail(value);
    } else if (name === 'password') {
      return setPassword(value);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      if (newAccount) {
        // create account
        await auth.createUserWithEmailAndPassword(email, password);
      } else {
        // log in
        await auth.signInWithEmailAndPassword(email, password);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const toggleAccount = () => {
    setNewAccount((prev) => !prev);
  }

  const socialLogin = async (e) => {
    const name = e.target.name;

    let provider;
    if (name === 'google') {
      provider = new firebaseInstance.auth.GoogleAuthProvider()
    } else if (name === 'github') {
      provider = new firebaseInstance.auth.GithubAuthProvider();
    }

    await auth.signInWithPopup(provider); 
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input name="email" type="text" value={email} onChange={onChange} placeholder="email" required />
        <input name="password" type="password" value={password} onChange={onChange} placeholder="password" required />
        <button type="submit">{newAccount ? 'Create Account' : 'Log In'}</button>
      </form>
      <span>{error}</span>
      <button type="button" onClick={toggleAccount}>{newAccount ? "I'm aleady user!" : "I want a new account!"}</button>
      <button name="google" type="button" onClick={socialLogin}>Continue with Google</button>
      <button name="github" type="button" onClick={socialLogin}>Continue with Github</button>
    </div>
  )
};

export default Auth;
