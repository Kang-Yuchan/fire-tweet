import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../components/App';
import { db } from '../firebase';

const Home = () => {
  const [tweet, setTweet] = useState("");
  const [tweets, setTweets] = useState([]);
  const userObj = useContext(UserContext);

  const onSubmit = async (e) => {
    e.preventDefault();
    await db.collection("tweets").add({
      text: tweet,
      createdAt: Date.now(),
      userId: userObj.uid,
    });
    setTweet("");
  } 

  const onChange = (e) => {
    const value = e.target.value;
    setTweet(value);
  }

  const getDbTweets = async () => {
    await db.collection("tweets").onSnapshot((snapshot) =>{
      const tweetArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTweets(tweetArray.sort((a, b) => {
        return b.createdAt - a.createdAt;
      }))
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
          <span>{tweetData.text}</span>
        </div>
      ))}
    </div>
  )
};

export default Home;
