import firebase from "firebase/app";
// If you are using v7 or any earlier version of the JS SDK, you should import firebase using namespace import
// import * as firebase from "firebase/app"

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/analytics";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";

import "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyBIqe_nsnTbiyw69gsBFYuIoE5XnT0JQDc",
  authDomain: "unistore-722da.firebaseapp.com",
  projectId: "unistore-722da",
  storageBucket: "unistore-722da.appspot.com",
  messagingSenderId: "506807421988",
  appId: "1:506807421988:web:0daca9768ab3fbdf0e9cb1",
  measurementId: "G-5MZDSHNVPJ"
};

firebase.initializeApp(firebaseConfig)
export const firebaseInstance = firebase
export const authService = firebase.auth()
export const dbService = firebase.firestore()
export const storageService = firebase.storage()