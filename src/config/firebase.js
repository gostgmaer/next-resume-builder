// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration

const firebaseConfig = () => {
  const config = {
    apiKey: "AIzaSyB5K2i-ry0abSisdBPu88PrAYlfvU9fsAE",
    authDomain: "react-resume-builder-497bb.firebaseapp.com",
    databaseURL:
      "https://react-resume-builder-497bb-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "react-resume-builder-497bb",
    storageBucket: "react-resume-builder-497bb.appspot.com",
    messagingSenderId: "544706229003",
    appId: "1:544706229003:web:6cdb8d4b6c70cf7e36a80e",
  };

  // Initialize Firebase
  const app = initializeApp(config);
  return getDatabase(app)
};
export default firebaseConfig;
