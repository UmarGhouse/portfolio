import React, { useEffect, useState, useCallback } from "react";
import Routes from "../routes/Index";
import { BrowserRouter as Router } from "react-router-dom";
import { NavBar } from "./Blocks";
import { ScrollToTop } from '../components/Utilities'
import UserContext from './Contexts/UserContext'

import firebase from 'firebase/app'
import 'firebase/analytics'
import 'firebase/auth'

import settings from '../settings/settings'

firebase.initializeApp(settings.firebaseConfig)

function onAuthStateChange(callback) {
  return firebase.auth().onAuthStateChanged(user => {
    if (user) {
      callback(user)
    } else {
      callback(null)
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
  const [user, setUser] = useState(null)

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
      <UserContext.Provider value={{ userDetails: user, logout: requestLogout, login: requestLogin}}>
        <NavBar {...props} />

        {Routes}
      </UserContext.Provider>

    </Router>
  )
};