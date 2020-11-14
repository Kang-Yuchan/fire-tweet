import React, { useEffect, useState } from 'react';
import { db } from '../firebase';

const Home = () => {
  const [tweet, setTweet] = useState("");
  const [tweets, setTweets] = useState([]);

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

  const getDbTweets = async () => {
    const dbTweets =  await db.collection("tweets").get(); 
    dbTweets.forEach((document) => {
      const tweetDataObject = {
        id: document.id,
        ...document.data(),
      };
      setTweets((prev) => [tweetDataObject, ...prev]);
    });
  };

  useEffect(() => {
    getDbTweets();
  }, [])

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type="text" placeholder="Let's tweet!" maxLength={120} onChange={onChange} value={tweet} />
        <button type="submit">tweet</button>
      </form>
      {tweets.map((tweetData) => (
        <div key={tweetData.id}>
          <span>{tweetData.tweet}</span>
        </div>
      ))}
    </div>
  )
};

export default Home;
