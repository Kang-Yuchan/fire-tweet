import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../components/App';
import Tweet from '../components/Tweet';
import { db, storage } from '../firebase';
import { v4 as uuidv4 } from 'uuid';

const Home = () => {
  const [tweet, setTweet] = useState("");
  const [tweets, setTweets] = useState([]);
  const [previewImageUrl, setPreviewImageUrl] = useState("");
  const userObj = useContext(UserContext);
  const userId = userObj.uid;

  const onSubmit = async (e) => {
    e.preventDefault();
    let fileUrl = "";
    if (previewImageUrl !== "") {
      const fileRef = storage.ref().child(`${userId}/${uuidv4()}`);
      const response = await fileRef.putString(previewImageUrl, "data_url");
      fileUrl = await response.ref.getDownloadURL();
    }

    await db.collection("tweets").add({
      text: tweet,
      createdAt: Date.now(),
      userId,
      fileUrl,
    });
    setTweet("");
    setPreviewImageUrl("");
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

  const onFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = (fininishedEvent) => {
      const result = fininishedEvent.currentTarget.result;

      setPreviewImageUrl(result);
    }
    reader.readAsDataURL(file);
  }

  const clearPreview = () => setPreviewImageUrl(null);

  useEffect(() => {
    getDbTweets();
  }, [])

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type="text" placeholder="Let's tweet!" maxLength={120} onChange={onChange} value={tweet} />
        <input type="file" onChange={onFileUpload} accept="image/*" />
        <button type="submit">tweet</button>
      </form>
      <div>
      {tweets.map((tweetObj) => (
        <Tweet key={tweetObj.id} tweetObj={tweetObj} isMyTweet={tweetObj.userId === userId} />
      ))}
      {previewImageUrl && (
        <div>
          <img src={previewImageUrl} width="50px" height="50px" />
          <button type="button" onClick={clearPreview}>Cancle</button> 
        </div>
      )}
      </div>
    </div>
  )
};

export default Home;
