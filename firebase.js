import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { getStorage, ref } from "firebase/storage";
import { getAuth, GoogleAuthProvider, connectAuthEmulator } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";


var firebaseConfig = {
  apiKey: "AIzaSyCy9Y1VKbNv_4YpEPpW_R29ceaFJjms4AI",
  authDomain: "catscradle-firebasetry5.firebaseapp.com",
  databaseURL: "https://catscradle-firebasetry5-default-rtdb.firebaseio.com",
  projectId: "catscradle-firebasetry5",
  storageBucket: "catscradle-firebasetry5.appspot.com",
  messagingSenderId: "480913266289",
  appId: "1:480913266289:web:61aae8ee798c3f08536dd0",
  measurementId: "G-KYXK8XYXFF",
};


// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
var db = firebaseApp.firestore();

// auth
const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();


// Test if the app is currently in production mode

console.log(import.meta.env.NODE_ENV)
console.log(window.EMULATION)

// if (!window.EMULATION && import.meta.env.NODE_ENV !== 'production') {
//   connectAuthEmulator(auth, "http://127.0.0.1:9099");
//   connectFirestoreEmulator(db, "127.0.0.1", 9000);

//   // signInWithCredential(auth, GoogleAuthProvider.credential(
//   //   '{"sub": "qEvli4msW0eDz5mSVO6j3W7i8w1k", "email": "tester@gmail.com", "displayName":"Test User", "email_verified": true}'
//   // ));
  
//   // set flag to avoid connecting twice, e.g., because of an editor hot-reload
//   window.EMULATION = true;

//   console.log("Connecting to emulators...");

// } else {
//   console.log("Not connecting to emulators...");
// }

export default db;
export const storage = getStorage(firebaseApp);
export { auth, provider };
