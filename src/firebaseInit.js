// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBtzGLHqtJK-GcvJJJhg1eqzq15j7k50RY",
  authDomain: "blogging-app-4ab74.firebaseapp.com",
  projectId: "blogging-app-4ab74",
  storageBucket: "blogging-app-4ab74.appspot.com",
  messagingSenderId: "1037290421644",
  appId: "1:1037290421644:web:4c7bd0cdfedf51c56eaaa9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);