import React, { useState } from 'react';

const Home = () => {
  const [tweet, setTweet] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
  } 

  const onChange = (e) => {
    const value = e.target.value;
    setTweet(value);
  }
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type="text" placeholder="Let's tweet!" maxLength={120} onChange={onChange} value={tweet} />
        <button type="submit">tweet</button>
      </form>
    </div>
  )
};

export default Home;
