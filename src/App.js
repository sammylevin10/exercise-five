import React from "react";
import { Route, BrowserRouter as Router, Redirect } from "react-router-dom";
import firebase from "firebase/app";
import "firebase/auth";
// Styles
import "./App.css";
// Pages
import Login from "./containers/Login";
import CreateAccount from "./containers/CreateAccount";
import UserProfile from "./containers/UserProfile";
// Components
import Header from "./components/Header";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: "exercise-five-7e826.firebaseapp.com",
  databaseURL: "https://exercise-five-7e826.firebaseio.com",
  projectId: "exercise-five-7e826",
  storageBucket: "exercise-five-7e826.appspot.com",
  messagingSenderId: "861117397952",
  appId: "1:861117397952:web:28628c3fedd3f71bb96625",
};

function App() {
  return (
    <div className="App">
      <Header />
      <Router>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/create-account">
          <CreateAccount />
        </Route>
        <Route exact path="/">
          <UserProfile />
        </Route>
      </Router>
    </div>
  );
}

export default App;
