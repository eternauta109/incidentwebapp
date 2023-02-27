// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "@firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB-mkRV1MAmvYufibAhprPrLtCFZRWnucY",
  authDomain: "incident-report-35ccd.firebaseapp.com",
  projectId: "incident-report-35ccd",
  storageBucket: "incident-report-35ccd.appspot.com",
  messagingSenderId: "74740596894",
  appId: "1:74740596894:web:713871e6e17ada7c437b8f",
  measurementId: "G-ZRPKVFL4EZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const storage = getStorage(app);

export const db = getFirestore(app);

export const auth = getAuth(app);
