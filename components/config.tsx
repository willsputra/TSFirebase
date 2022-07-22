// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD_qEJGSaG09MPMa-RGHcZCfYASTjTT8jE",
  authDomain: "rnative1-1c71b.firebaseapp.com",
  projectId: "rnative1-1c71b",
  storageBucket: "rnative1-1c71b.appspot.com",
  messagingSenderId: "533999272276",
  appId: "1:533999272276:web:4978a7c41203a9698a08c1",
  measurementId: "G-DX4YXYTTBG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);