// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCyd2X_7XNvUrLI6XEvvUl0LA8SP_67VC4",
  authDomain: "nologia-51cbb.firebaseapp.com",
  projectId: "nologia-51cbb",
  storageBucket: "nologia-51cbb.appspot.com",
  messagingSenderId: "795095561006",
  appId: "1:795095561006:web:aa4eb27fad5eacebcb80bf",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();
export default app;
