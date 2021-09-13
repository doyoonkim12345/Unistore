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
  /*apiKey: "AIzaSyBRqbUs76EuofAWzrndFobnGfz3KTJ7Y8M",
  authDomain: "unistoreback.firebaseapp.com",
  projectId: "unistoreback",
  storageBucket: "unistoreback.appspot.com",
  messagingSenderId: "478496477541",
  appId: "1:478496477541:web:67901dbffab042e192518c",
  measurementId: "G-Q5EYVGRTVV"*/
  apiKey: "AIzaSyD3HS6_bCPZMQRi3P50Hp_TNnN6Rlfrk3Q",
  authDomain: "examples-c0475.firebaseapp.com",
  databaseURL: "https://examples-c0475.firebaseio.com",
  projectId: "examples-c0475",
  storageBucket: "examples-c0475.appspot.com",
  messagingSenderId: "59826551283",
  appId: "1:59826551283:web:3e94357e39626661287a86"
};

firebase.initializeApp(firebaseConfig)
export const firebaseInstance = firebase
export const authService = firebase.auth()
export const dbService = firebase.firestore()
export const storageService = firebase.storage()