import React, { useState } from 'react';
import { auth } from '../firebase';

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
      let data;
      if (newAccount) {
        // create account
        data = await auth.createUserWithEmailAndPassword(email, password);
      } else {
        // log in
        data = await auth.signInWithEmailAndPassword(email, password);
      }
      console.log(data);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input name="email" type="text" value={email} onChange={onChange} placeholder="email" required />
        <input name="password" type="password" value={password} onChange={onChange} placeholder="password" required />
        <button type="submit">{newAccount ? 'Create Account' : 'Log In'}</button>
      </form>
      <span>{error}</span>
      <button type="button">Continue with Google</button>
      <button type="button">Continue with Github</button>
    </div>
  )
};

export default Auth;
