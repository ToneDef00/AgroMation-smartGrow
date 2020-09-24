import { app, db } from "../consts/firebase";
import { AUTH_ERROR, AUTH_USER } from "./types";
import { setUser, setExampleUser } from "./User";

export const signUpWithEmailPass = (formProps) => async dispatch => {

  app.auth().createUserWithEmailAndPassword(formProps.email, formProps.password).catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    dispatch({ type: AUTH_ERROR, payload: `AUTH error |${errorCode}|${errorMessage}` })
  });
};


export const attemptSigninEmailpass = (formProps, callback) => async dispatch => {
  app.auth().signInWithEmailAndPassword(formProps.email, formProps.password).catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    dispatch({ type: AUTH_ERROR, payload: `AUTH error |${errorCode}|${errorMessage}` })
  });
}

export const startListeningToAuth = () => async dispatch => {
  app.auth().onAuthStateChanged(function (user) {
    if (user) {
      
      localStorage.setItem("token", JSON.stringify(user));
      dispatch({ type: AUTH_USER, payload: user })
      // User is signed in.
      // var displayName = user.displayName;
      // var email = user.email;
      // var emailVerified = user.emailVerified;
      // var photoURL = user.photoURL;
      // var isAnonymous = user.isAnonymous;
      // var uid = user.uid;
      // var providerData = user.providerData;
      // ...
      // fetchUser(user.uid)

    } else {
      // User is signed out.
      // ...
      localStorage.setItem("token", "");
      dispatch({ type: AUTH_USER, payload: `` })
    }
  });
};


export const firebaseSignOut = () => async dispatch => {
  app.auth().signOut().then(function () {
    // Sign-out successful.
    localStorage.setItem("token", "");
    dispatch({ type: AUTH_USER, payload: `` })
  }).catch(function (error) {
    // An error happened.
    dispatch({ type: AUTH_ERROR, payload: `error during signout ${error}` })
  });
}