import React, { useEffect, useState, useCallback, useContext } from "react";
import Routes from "../routes/Index";
import { BrowserRouter as Router } from "react-router-dom";
import { NavBar } from "./Blocks";
import { ScrollToTop } from '../components/Utilities'

import firebase from 'firebase/app'
import 'firebase/analytics'
import 'firebase/auth'

import Login from "../components/StaticPages/Login";

import settings from '../settings/settings'

firebase.initializeApp(settings.firebaseConfig)

function onAuthStateChange(callback) {
  return firebase.auth().onAuthStateChanged(user => {
    if (user) {
      callback({ loggedIn: true })
    } else {
      callback({ loggedIn: false })
    }
  });
}

function login(username, password) {
  firebase.auth().signInWithEmailAndPassword(username, password);
}

function logout() {
  firebase.auth().signOut();
}

export default props => {
  const [user, setUser] = useState({ loggedIn: false })

  useEffect(() => {
    const unsubscribe = onAuthStateChange(setUser)

    return () => {
      unsubscribe()
    }
  }, [])

  const requestLogin = useCallback((username, password) => {
    login(username, password);
  });
  const requestLogout = useCallback(() => {
    logout();
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <NavBar {...props} />

      { !user.loggedIn && <Login onClick={requestLogin} /> }
      {user.loggedIn && Routes}
    </Router>
  )
};