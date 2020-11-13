import React, { useState } from 'react';

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    if (name === 'email') {
      return setEmail(value);
    } else if (name === 'password') {
      return setPassword(value);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input name="email" type="text" value={email} onChange={onChange} placeholder="email" required />
        <input name="password" type="password" value={password} onChange={onChange} placeholder="password" required />
        <button type="submit">Log In</button>
      </form>
      <button type="button">Continue with Google</button>
      <button type="button">Continue with Github</button>
    </div>
  )
};

export default Auth;
