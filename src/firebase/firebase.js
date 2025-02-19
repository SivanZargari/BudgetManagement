// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBBco1yu3uoLORhq_IyV2SJXKE4X0H-Lq4",
  authDomain: "budgetmanagement-16a30.firebaseapp.com",
  projectId: "budgetmanagement-16a30",
  storageBucket: "budgetmanagement-16a30.firebasestorage.app",
  messagingSenderId: "207001063615",
  appId: "1:207001063615:web:adea690def3e7c29c6360a",
  measurementId: "G-JCVLSL6MDR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;
