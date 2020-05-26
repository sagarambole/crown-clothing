import firebase from 'firebase/app';

import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCciU-WTQnphnZaUpVmdNOn7Vvobt1wTpE",
    authDomain: "tutorial-crown.firebaseapp.com",
    databaseURL: "https://tutorial-crown.firebaseio.com",
    projectId: "tutorial-crown",
    storageBucket: "tutorial-crown.appspot.com",
    messagingSenderId: "450308116284",
    appId: "1:450308116284:web:2aca4a214a2176aeee9839",
    measurementId: "G-PXS98QJ55L"
  };

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;
    const userRef = firestore.doc(`/users/${userAuth.uid}`);  
    const snapShot = await userRef.get()
    if(!snapShot.exists) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();

      try {
        await userRef.set({
          displayName, email, createdAt, ...additionalData
        })
      } catch(error) {
        console.log('error creating user ', error.message);
      }
    }
    return userRef;
  }

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account'});

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
