// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAitHyCPk_Ltc7VV7CadUfJ4vTjmQLu29A",
  authDomain: "lms-react-d30a2.firebaseapp.com",
  projectId: "lms-react-d30a2",
  storageBucket: "lms-react-d30a2.appspot.com",
  messagingSenderId: "905319500024",
  appId: "1:905319500024:web:2fc8cb04287b2a5309d30d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app)

export {app, db, auth};