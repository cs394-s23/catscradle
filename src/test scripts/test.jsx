// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, onSnapShot, addDoc, deleteDoc, doc, query, where } from "firebase/firestore";
import { getDatabase } from "firebase/database";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCy9Y1VKbNv_4YpEPpW_R29ceaFJjms4AI",
    authDomain: "catscradle-firebasetry5.firebaseapp.com",
    projectId: "catscradle-firebasetry5",
    storageBucket: "catscradle-firebasetry5.appspot.com",
    messagingSenderId: "480913266289",
    appId: "1:480913266289:web:61aae8ee798c3f08536dd0",
    measurementId: "G-KYXK8XYXFF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const rtdb = getDatabase(app);

const q = query(collection(db, "users"), where("itemTitle", "==", "Chairs"));

onSnapShot(q, (snapShot) => {
    let rets = []
    snapShot.docs.forEach((doc) => {
        rets.push({...doc.data(), id: doc.id})
    })
    console.log(rets)
})



