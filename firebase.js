import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { getStorage, ref } from "firebase/storage";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

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

export default db;
export const storage = getStorage(firebaseApp);
export { auth, provider };
