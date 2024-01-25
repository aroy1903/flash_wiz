// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAOL-VJ1jAUGG2CGyBci6rI0J4MTpD8CHk",
  authDomain: "flashwiz-9e224.firebaseapp.com",
  projectId: "flashwiz-9e224",
  storageBucket: "flashwiz-9e224.appspot.com",
  messagingSenderId: "449039789177",
  appId: "1:449039789177:web:796e21a9108ead0386b8a8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app