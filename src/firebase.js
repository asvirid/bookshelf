// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDFLCNOl5EbMDrehEp8rjkRThCWgvAOb6Q",
  authDomain: "bookshelf-2cb82.firebaseapp.com",
  projectId: "bookshelf-2cb82",
  storageBucket: "bookshelf-2cb82.appspot.com",
  messagingSenderId: "723040070218",
  appId: "1:723040070218:web:1cebf4b7f19322ef5354b3"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;