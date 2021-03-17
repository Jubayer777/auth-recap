import firebase from "firebase/app";
import "firebase/auth";
import { useState } from "react";
import './App.css';
import firebaseConfig from "./firebase.config";


if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}else {
  firebase.app();
}

function App() {
  const [user, setUser]=useState({});
  var provider = new firebase.auth.GoogleAuthProvider();
  var fbProvider = new firebase.auth.FacebookAuthProvider();
  var githubProvider = new firebase.auth.GithubAuthProvider();
  const handleGoogleSignIn = () => {
       firebase.auth().signInWithPopup(provider)
      .then((result) => {
        var credential = result.credential;
        var token = credential.accessToken;
        var user = result.user;
        console.log(user);
        setUser(user);
       
      }).catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
        console.log(errorCode, errorMessage, email, credential);
       
      });
  }
  const handleFacebookSignIn=()=>{
      firebase.auth().signInWithPopup(fbProvider)
      .then((result) => {
        var credential = result.credential;
        var user = result.user;
        var accessToken = credential.accessToken;
        console.log('fb User:', user);
        setUser(user);
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
        console.log(errorCode, errorMessage, email, credential);
      });
  }
  const handleGithubSignIn=()=>{
      firebase.auth().signInWithPopup(githubProvider)
      .then((result) => {
       var credential = result.credential;
       var token = credential.accessToken;
       var user = result.user;
       console.log('github User:', user);
        setUser(user);
      }).catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
        console.log(errorCode, errorMessage, email, credential);
      });
  }
  return (
    <div className="App">
      <button onClick={handleGoogleSignIn}>Sign In With Google</button>
      <br/>
      <button onClick={handleFacebookSignIn}>Sign In With Facebook</button>
      <br/>
      <button onClick={handleGithubSignIn}>Sign In With Github</button>
      <h3>User Name: {user.displayName}</h3>
      <img src={user.photoURL} alt=""/>
    </div>
  );
}

export default App;
