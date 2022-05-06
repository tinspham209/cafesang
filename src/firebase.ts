import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
// Config
const config = {
  apiKey: 'AIzaSyAakvGL8JTh5mtE8Tj4BtFSX1SpPd_FG20',
  authDomain: 'cafe-sang.firebaseapp.com',
  projectId: 'cafe-sang',
  storageBucket: 'cafe-sang.appspot.com',
  messagingSenderId: '321761445736',
  appId: '1:321761445736:web:370949a6fe51e5b8b6f8dd',
  measurementId: 'G-NJNK55KX7D',
};

const firebaseApp = firebase.initializeApp(config);
const fireStore = firebaseApp.firestore();
const fireAuth = firebase.auth();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
export { firebaseApp, fireStore, fireAuth, googleAuthProvider };
