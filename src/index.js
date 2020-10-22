import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import * as firebase from "firebase";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyCSL6EBPDOK2gQ3P7bWx1ulAazyisPC0EQ",
  authDomain: "swenm-5e687.firebaseapp.com",
  databaseURL: "https://swenm-5e687.firebaseio.com",
  projectId: "swenm-5e687",
  storageBucket: "swenm-5e687.appspot.com",
  messagingSenderId: "855357973365",
  appId: "1:855357973365:web:74fd016a71f4046d62a93c",
  measurementId: "G-1VF3CZBFFD",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

firebase
  .auth()
  .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
  .then(
    ReactDOM.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
      document.getElementById("root")
    )
  )
  .catch(() => alert("Session storage needed"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
