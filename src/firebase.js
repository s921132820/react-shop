// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAd9HTJHujvCbIlT1fSjZ4VMeefS9z1V0Y",
  authDomain: "react-shopping-app-b6c80.firebaseapp.com",
  projectId: "react-shopping-app-b6c80",
  storageBucket: "react-shopping-app-b6c80.firebasestorage.app",
  messagingSenderId: "220561418934",
  appId: "1:220561418934:web:3f28f37de3175aac009417"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;