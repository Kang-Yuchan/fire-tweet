import firebase from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAGPADaADRYI1KT7HFhINT5q50bRczL_HE",
  authDomain: "fire-tweet-7c336.firebaseapp.com",
  databaseURL: "https://fire-tweet-7c336.firebaseio.com",
  projectId: "fire-tweet-7c336",
  storageBucket: "fire-tweet-7c336.appspot.com",
  messagingSenderId: "909410632689",
  appId: "1:909410632689:web:ff86bbc858b428f974fa50"
};

export default firebase.initializeApp(firebaseConfig);
