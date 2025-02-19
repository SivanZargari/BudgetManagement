import React, { useEffect, useState } from 'react';
import { googleSignIn, googleSignOut, auth } from './firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';
import './App.css';
import logo from './logo.svg';

function App() {
  const [user, setUser] = useState(null);
  const [income, setIncome] = useState({
    salary: '',
    governmentSupport: '',
    rentalIncome: '',
    otherSupport: '',
    giftsBonuses: '',
    otherIncome: '',
  });

  const [extraIncomeFields, setExtraIncomeFields] = useState([]); // מחזיק את השדות שנוספו

  useEffect(() => {
    console.log('Firebase app initialized');

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleIncomeChange = (event) => {
    const { name, value } = event.target;
    if (/^\d*$/.test(value)) {
      setIncome((prevIncome) => ({
        ...prevIncome,
        [name]: value,
      }));
    }
  };

  const handleExtraIncomeChange = (index, value) => {
    if (/^\d*$/.test(value)) {
      const updatedFields = [...extraIncomeFields];
      updatedFields[index] = value;
      setExtraIncomeFields(updatedFields);
    }
  };

  const addExtraIncomeRow = () => {
    setExtraIncomeFields([...extraIncomeFields, '']); // הוספת שדה חדש
  };

  // חישוב סך כל ההכנסות
  const totalIncome = Object.values(income)
    .reduce((acc, curr) => acc + (parseInt(curr) || 0), 0); // המרת ערכים למספרים וחישוב הסכום

  return (
    <div className="App">
      <h1>ניהול תקציב</h1>
      <h3>!אל תיתן לתקציב לנהל אותך – נהל אותו בעצמך</h3>

      <p style={{ maxWidth: "600px", margin: "auto", textAlign: "center" }}>
      ניהול משק בית דומה לניהול עסק – כדי לשמור על איזון כלכלי, חשוב לדעת בדיוק מהן ההכנסות ומהן ההוצאות. שמירה על תקציב מסודר תסייע לכם להימנע מחובות והוצאות מיותרות, ותאפשר לכם לחסוך ולהגשים מטרות וחלומות. כמו בכל תחום בחיים, ברגע שמתחילים לנהל תקציב באופן עקבי, זה הופך להרגל חיובי שמוביל לשקט כלכלי.      </p>

      {user ? (
        <button onClick={googleSignOut}>התנתק מחשבון</button>
      ) : (
        <button onClick={googleSignIn}> Google התחבר עם </button>
      )}

      <div className="income-section" dir="rtl">
        <h2>הכנסות חודשיות</h2>
        <h4>כמה כסף נכנס החודש?</h4>
        <div className="income-inputs">
        <label>שכר מעבודה או מקצבת פנסיה:
    <input type="text" name="salary" value={income.salary} onChange={handleIncomeChange} dir="rtl" />
    <span>₪</span>
  </label>
  <label>קצבאות ותמיכות מהממשלה:
    <input type="text" name="governmentSupport" value={income.governmentSupport} onChange={handleIncomeChange} dir="rtl" />
    <span>₪</span>
  </label>
  <label>הכנסה משכירות:
    <input type="text" name="rentalIncome" value={income.rentalIncome} onChange={handleIncomeChange} dir="rtl" />
    <span>₪</span>
  </label>
  <label>תמיכה אחרת – אם אתם מקבלים:
    <input type="text" name="otherSupport" value={income.otherSupport} onChange={handleIncomeChange} dir="rtl" />
    <span>₪</span>
  </label>
  <label>מתנות ובונוסים:
    <input type="text" name="giftsBonuses" value={income.giftsBonuses} onChange={handleIncomeChange} dir="rtl" />
    <span>₪</span>
  </label>
  <label>הוצאה נוספת כללית:
    <input type="text" name="otherIncome" value={income.otherIncome} onChange={handleIncomeChange} dir="rtl" />
    <span>₪</span>
  </label>

  {/* הצגת שדות נוספים שנוספו על ידי המשתמש */}
  {extraIncomeFields.map((value, index) => (
    <label key={index}>הוצאה נוספת כללית:
      <input type="text" value={value} onChange={(e) => handleExtraIncomeChange(index, e.target.value)} dir="rtl" />
      <span>₪</span>
    </label>
  ))}

          {/* כפתור להוספת שדה חדש */}
          <button onClick={addExtraIncomeRow} className="add-income-button">+ הוסף עוד שורה</button>
        </div>
      </div>
          
          {/* הצגת סך כל ההכנסות */}
      <div className="total-income">
        <h3>סה"כ הכנסות: ₪{totalIncome} </h3>
      </div>

      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
