import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyC10LpgM5Dok_Sqr2PhnekFMBPpssmYi7w",
    authDomain: "reviews-18282.firebaseapp.com",
    databaseURL: "https://reviews-18282-default-rtdb.firebaseio.com",
    projectId: "reviews-18282",
    storageBucket: "reviews-18282.firebasestorage.app",
    messagingSenderId: "596265120517",
    appId: "1:596265120517:web:95e86ac36fdbf0ccd37d6c",
    measurementId: "G-CKFNKZ6CT6"
  };

  const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app);
  export const db = getFirestore(app);
  export const googleProvider = new GoogleAuthProvider();
