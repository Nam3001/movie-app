import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyANZYMu4rNgCLCcjbAvsaY6493XfFcaByQ",
  authDomain: "movie-app-ada47.firebaseapp.com",
  projectId: "movie-app-ada47",
  storageBucket: "movie-app-ada47.appspot.com",
  messagingSenderId: "112892168433",
  appId: "1:112892168433:web:7c2e1b303ff14a9a10c150",
  measurementId: "G-9MJ19R4TRS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth }