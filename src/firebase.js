// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDV5H6130BXOknJyImt7necBrcAJP34P4I",
  authDomain: "react-auth-460b4.firebaseapp.com",
  projectId: "react-auth-460b4",
  storageBucket: "react-auth-460b4.appspot.com",
  messagingSenderId: "304780854187",
  appId: "1:304780854187:web:994766ef9e1098c54e88ee"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//Initialize firebase authentication and get a reference to the service
export const auth = getAuth(app);