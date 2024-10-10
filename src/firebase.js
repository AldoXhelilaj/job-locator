// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API,
  authDomain: "maps-15c3d.firebaseapp.com",
  projectId: "maps-15c3d",
  storageBucket: "maps-15c3d.appspot.com",
  messagingSenderId: "245539189724",
  appId: "1:245539189724:web:920e63f504c9fde57cd519"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };