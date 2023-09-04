
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDa_D5TwfR0BEGi6dbgWCGp-PRAjhF6TWo",
  authDomain: "career-sync-2.firebaseapp.com",
  projectId: "career-sync-2",
  storageBucket: "career-sync-2.appspot.com",
  messagingSenderId: "175405001080",
  appId: "1:175405001080:web:2c585f118ea1f8d64a408d"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export { auth, provider, storage };
export default db;