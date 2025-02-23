import React, { useEffect, useState } from 'react';
import { googleSignIn, googleSignOut, auth } from './firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

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

  const [extraIncomeFields, setExtraIncomeFields] = useState([]);
  const [activePage, setActivePage] = useState('income'); // state to track active page

  useEffect(() => {
    console.log('Firebase app initialized');

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleIncomeChange = (event) => {
    if (!user) {
      alert("יש להתחבר על מנת לבצע ניהול חכם של הכסף שלך");
      return; 
    }

    const { name, value } = event.target;
    if (/^\d*$/.test(value)) {
      setIncome((prevIncome) => ({
        ...prevIncome,
        [name]: value,
      }));
    }
  };

  const handleExtraIncomeChange = (index, value) => {
    if (!user) {
      alert("יש להתחבר על מנת לבצע ניהול חכם של הכסף שלך");
      return; 
    }

    if (/^\d*$/.test(value)) {
      const updatedFields = [...extraIncomeFields];
      updatedFields[index] = value;
      setExtraIncomeFields(updatedFields);
    }
  };

  const addExtraIncomeRow = () => {
    if (!user) {
      alert("יש להתחבר על מנת להוסיף שדה חדש");
      return; 
    }

    setExtraIncomeFields([...extraIncomeFields, '']); 
  };

  const totalIncome = Object.values(income)
    .reduce((acc, curr) => acc + (parseInt(curr) || 0), 0) + extraIncomeFields.reduce((acc, curr) => acc + (parseInt(curr) || 0), 0);

  return (
    <Router>
      <div className="App">
        <h1>ניהול תקציב</h1>
        <h3>!אל תיתן לכסף לנהל אותך – נהל אותו בעצמך</h3>

        <div className="text-block">
          <p> ניהול משק בית דומה לניהול עסק – כדי לשמור על איזון כלכלי, חשוב לדעת בדיוק מהן ההכנסות ומהן ההוצאות. שמירה על תקציב מסודר תסייע לכם להימנע מחובות והוצאות מיותרות, ותאפשר לכם לחסוך ולהגשים מטרות וחלומות. כמו בכל תחום בחיים, ברגע שמתחילים לנהל תקציב באופן עקבי, זה הופך להרגל חיובי שמוביל לשקט כלכלי. </p>
        </div>

        {user ? (
          <button onClick={googleSignOut} className="logout">התנתק מחשבון</button>
        ) : (
          <button onClick={googleSignIn}> Google התחבר עם</button>
        )}

        <div className="income-section" dir="rtl">
          <nav className="navbar">
            <ul>
              <li><Link to="/" onClick={() => setActivePage('income')}>הכנסות חודשיות</Link></li>
              <li><Link to="/page2" onClick={() => setActivePage('page2')}>הוצאות ניהוליות </Link></li>
              <li><Link to="/page3" onClick={() => setActivePage('page3')}>עמוד 3</Link></li>
              <li><Link to="/page4" onClick={() => setActivePage('page4')}>עמוד 4</Link></li>
              <li><Link to="/page5" onClick={() => setActivePage('page5')}>עמוד 5</Link></li>
            </ul>
          </nav>

          {/* כל כפתור משנה את התוכן */}
          {activePage === 'income' && (
            <div>
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

                {extraIncomeFields.map((value, index) => (
                  <label key={index}>הוצאה נוספת כללית:
                    <input type="text" value={value} onChange={(e) => handleExtraIncomeChange(index, e.target.value)} dir="rtl" />
                    <span>₪</span>
                  </label>
                ))}

                <button onClick={addExtraIncomeRow} className="add-income-button">+ הוסף עוד שורה</button>
              </div>

              <div className="total-income">
                <h3>סה"כ הכנסות: ₪{totalIncome} </h3>
              </div>
            </div>
          )}

          {/* דפים נוספים */}
          {activePage === 'page2' && <h2>הוצאות ניהוליות</h2>}
          {activePage === 'page3' && <h2>עמוד 3</h2>}
          {activePage === 'page4' && <h2>עמוד 4</h2>}
          {activePage === 'page5' && <h2>עמוד 5</h2>}
        </div>
      </div>
    </Router>
  );
}

export default App;
