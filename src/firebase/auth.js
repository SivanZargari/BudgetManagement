import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import app from './firebase'; // ייבוא האפליקציה שיצרנו בקובץ firebase.js

// יצירת מופע auth מתוך האפליקציה של Firebase
const auth = getAuth(app);

// פונקציה להתחברות עם Google
export const googleSignIn = async () => {
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' }); // מחייב את המשתמש לבחור חשבון

  try {
    const result = await signInWithPopup(auth, provider);
    console.log("User Info:", result.user); // הצגת פרטי המשתמש
  } catch (error) {
    console.error("Error signing in with Google:", error);
  }
};

// פונקציה להתנתקות מהחשבון
export const googleSignOut = async () => {
  try {
    await signOut(auth);
    console.log("User signed out successfully");
  } catch (error) {
    console.error("Error signing out:", error);
  }
};

// ייצוא האובייקט auth
export { auth };
