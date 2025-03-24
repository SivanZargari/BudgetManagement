// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";  // הוסף את פונקציות ה-Firestore

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
const db = getFirestore(app);  // יצירת חיבור למסד הנתונים


// פונקציה לשמירה ב-Firestore
const saveSummaryData = async (userEmail, summaryData) => {
  try {
    const docRef = await addDoc(collection(db, "user_summaries"), {
      userEmail,
      summaryData,
      createdAt: new Date()
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

// פונקציה לשליפת נתונים מתוך Firestore
const getSummaryData = async () => {
  const querySnapshot = await getDocs(collection(db, "user_summaries"));
  querySnapshot.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
  });
};

// ייצוא הפונקציות והחיבור
export { app, saveSummaryData, getSummaryData }; 