import React, { useEffect, useState } from "react";
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
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userInformation, setUserInformation] = useState({});
  // const [userInformation, setUserInformation] = useState();

  // Ensure app is initialized when it is ready
  useEffect(() => {
    // If there are no firebase apps, initialize the app
    if (!firebase.apps.length) {
      // Initializes firebase
      firebase.initializeApp(firebaseConfig);
    }
  }, [firebaseConfig]);

  // Check to see if user is logged in...
  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        //User is logged in
        setLoggedIn(true);
        setUserInformation(user);
      } else {
        setLoggedIn(false);
      }
      setLoading(false);
    });
  }, []);

  // Function for logging in
  function LoginFunction(e) {
    // This is what you will run when you want to log in
    e.preventDefault();
    const email = e.currentTarget.loginEmail.value;
    const password = e.currentTarget.loginPassword.value;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(function (response) {
        console.log("Login response", response);
        setLoggedIn(true);
      })
      .catch(function (error) {
        console.log("Login error", error);
      });
  }
  // Function for logging out
  function LogoutFunction(e) {
    // Function to run when you want to log out
    firebase
      .auth()
      .signOut()
      .then(function () {
        setLoggedIn(false);
        setUserInformation({});
      })
      .catch(function (error) {
        console.log("Logout error", error);
      });
  }
  // Function for creating an account
  function CreateAccountFunction(e) {
    e.preventDefault();
    const email = e.currentTarget.createEmail.value;
    const password = e.currentTarget.createPassword.value;
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(function (response) {
        console.log("Valid account created for", email, response);
        setLoggedIn(true);
      })
      .catch(function (error) {
        console.log("Account Creation Failed", error);
      });
  }

  console.log({ loggedIn, loading });

  // Alternatively, you could return a component with a loading animation
  if (loading) return null;

  return (
    <div className="App">
      <Header loggedIn={loggedIn} LogoutFunction={LogoutFunction} />
      <Router>
        <Route exact path="/login">
          {/* If someone is logged in, do not take them to login page 
          - take them to user profile*/}
          {!loggedIn ? (
            <Login LoginFunction={LoginFunction} />
          ) : (
            <Redirect to="/" />
          )}
        </Route>
        <Route exact path="/create-account">
          {/* If someone is logged in, do not take them to create account page 
          - take them to user profile*/}
          {!loggedIn ? (
            <CreateAccount CreateAccountFunction={CreateAccountFunction} />
          ) : (
            <Redirect to="/" />
          )}
        </Route>
        <Route exact path="/">
          {/* If someone is not logged in, do not take them to user profile page 
          - take them to login*/}
          {!loggedIn ? (
            <Redirect to="/login" />
          ) : (
            <UserProfile userInformation={userInformation} />
          )}
        </Route>
      </Router>
    </div>
  );
}

export default App;
