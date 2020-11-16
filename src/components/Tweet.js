import React, { useState } from 'react';
import { db, storage } from '../firebase';

const Tweet = ({ tweetObj, isMyTweet }) => {
  const [isEditingMode, setIsEditingMode] = useState(false);
  const [newTweetText, setNewTweetText] = useState(tweetObj.text);

  const onClickDelete = async () => {
    const confirm = window.confirm('Are you want delete this tweet?');

    if (confirm) {
      await db.doc(`tweets/${tweetObj.id}`).delete();
      await storage.refFromURL(tweetObj.fileUrl).delete();
    }
  }

  const toggleEditingMode = () => setIsEditingMode((prev) => !prev);

  const onSubmit = async (e) => {
    e.preventDefault();
    await db.doc(`tweets/${tweetObj.id}`).update({
      text: newTweetText,
    });
    setIsEditingMode(false);
  }

  const onChange = (e) => {
    const value = e.target.value;

    setNewTweetText(value);
  }

  return (
    <div>
      {isEditingMode ? (
        <form onSubmit={onSubmit}>
          <input type="text" maxLength={120} onChange={onChange} value={newTweetText} />
          <button type="button" onClick={toggleEditingMode}>Cancle</button>
          <button type="submit">Update Tweet!</button>
        </form>
      ) : (
        <>
          <span>{tweetObj.text}</span>
          {tweetObj.fileUrl && <img src={tweetObj.fileUrl} width="80px" height="80px" />}
          {isMyTweet && (
            <>
              <button type="button" onClick={onClickDelete}>Delete</button>
              <button type="button" onClick={toggleEditingMode}>Edit</button>
            </>
          )}
        </>
      )}
    </div>
  )
};

export default Tweet;
