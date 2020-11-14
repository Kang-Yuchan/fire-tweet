import React, { useState } from 'react';
import { db } from '../firebase';

const Home = () => {
  const [tweet, setTweet] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    await db.collection("tweets").add({
      tweet,
      createdAt: Date.now(),
    });
    setTweet("");
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
