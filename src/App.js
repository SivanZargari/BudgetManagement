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

  const [expenses, setExpenses] = useState({
    savingsDeposit: '',
    pensionSavings: '',
    accountManagementFees: '',
  });

  const [housingExpenses, setHousingExpenses] = useState({
    rent: '',
    mortgage: '',
    mortgageInsurance: '',
    homeInsurance: '',
    homeownersAssociation: '',
    propertyTax: '',
    electricity: '',
    water: '',
    gas: '',
    mobilePhone: '',
    tvPackage: '',
    landlinePhone: '',
    internet: '',
    repairsMaintenance: '',
    houseCleaning: '',
    furnitureElectronics: '',
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

  const handleExpenseChange = (event) => {
    if (!user) {
      alert("יש להתחבר על מנת לבצע ניהול חכם של הכסף שלך");
      return;
    }

    const { name, value } = event.target;
    if (/^\d*$/.test(value)) {
      setExpenses((prevExpenses) => ({
        ...prevExpenses,
        [name]: value,
      }));
    }
  };

  const handleHousingExpenseChange = (event) => {
    if (!user) {
      alert("יש להתחבר על מנת לבצע ניהול חכם של הכסף שלך");
      return;
    }

    const { name, value } = event.target;
    if (/^\d*$/.test(value)) {
      setHousingExpenses((prevHousingExpenses) => ({
        ...prevHousingExpenses,
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

  const totalExpenses = Object.values(expenses)
    .reduce((acc, curr) => acc + (parseInt(curr) || 0), 0) + extraIncomeFields.reduce((acc, curr) => acc + (parseInt(curr) || 0), 0);

  const totalHousingExpenses = Object.values(housingExpenses)
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
              <li><Link to="/page3" onClick={() => setActivePage('page3')}>הוצאות מגורים</Link></li>
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

          {/* הוצאות ניהוליות */}
          {activePage === 'page2' && (
            <div>
              <h2>הוצאות ניהוליות</h2>
              <h4>חסכונות, השקעות וניהול פיננסי</h4>
              <div className="expense-inputs">
                <label>הפקדה קבועה לחיסכון או ניירות ערך:
                  <input type="text" name="savingsDeposit" value={expenses.savingsDeposit} onChange={handleExpenseChange} dir="rtl" />
                  <span>₪</span>
                </label>
                <label>הפקדה לחיסכון פנסיוני פרטי:
                  <input type="text" name="pensionSavings" value={expenses.pensionSavings} onChange={handleExpenseChange} dir="rtl" />
                  <span>₪</span>
                </label>
                <label>עמלות ניהול חשבון בנק וכרטיס אשראי:
                  <input type="text" name="accountManagementFees" value={expenses.accountManagementFees} onChange={handleExpenseChange} dir="rtl" />
                  <span>₪</span>
                </label>

                {extraIncomeFields.map((value, index) => (
                  <label key={index}>הוצאה נוספת כללית:
                    <input type="text" value={value} onChange={(e) => handleExtraIncomeChange(index, e.target.value)} dir="rtl" />
                    <span>₪</span>
                  </label>
                ))}

                <button onClick={addExtraIncomeRow} className="add-expense-button">+ הוסף עוד שורה</button>
              </div>

              <div className="total-expenses">
                <h3>סה"כ הוצאות: ₪{totalExpenses} </h3>
              </div>
            </div>
          )}

          {/* הוצאות מגורים */}
          {activePage === 'page3' && (
            <div>
              <h2>הוצאות מגורים</h2>
              <h4>חשבונות והוצאות נילוות</h4>
              <div className="expense-inputs">
                <label>שכר דירה:
                  <input type="text" name="rent" value={housingExpenses.rent} onChange={handleHousingExpenseChange} dir="rtl" />
                  <span>₪</span>
                </label>
                <label>משכנתא:
                  <input type="text" name="mortgage" value={housingExpenses.mortgage} onChange={handleHousingExpenseChange} dir="rtl" />
                  <span>₪</span>
                </label>
                <label>ביטוח משכנתא:
                  <input type="text" name="mortgageInsurance" value={housingExpenses.mortgageInsurance} onChange={handleHousingExpenseChange} dir="rtl" />
                  <span>₪</span>
                </label>
                <label>ביטוח דירה:
                  <input type="text" name="homeInsurance" value={housingExpenses.homeInsurance} onChange={handleHousingExpenseChange} dir="rtl" />
                  <span>₪</span>
                </label>
                <label>ועד בית:
                  <input type="text" name="homeownersAssociation" value={housingExpenses.homeownersAssociation} onChange={handleHousingExpenseChange} dir="rtl" />
                  <span>₪</span>
                </label>
                <label>ארנונה:
                  <input type="text" name="propertyTax" value={housingExpenses.propertyTax} onChange={handleHousingExpenseChange} dir="rtl" />
                  <span>₪</span>
                </label>
                <label>חשמל:
                  <input type="text" name="electricity" value={housingExpenses.electricity} onChange={handleHousingExpenseChange} dir="rtl" />
                  <span>₪</span>
                </label>
                <label>מים:
                  <input type="text" name="water" value={housingExpenses.water} onChange={handleHousingExpenseChange} dir="rtl" />
                  <span>₪</span>
                </label>
                <label>גז:
                  <input type="text" name="gas" value={housingExpenses.gas} onChange={handleHousingExpenseChange} dir="rtl" />
                  <span>₪</span>
                </label>
                <label>טלפון נייד:
                  <input type="text" name="mobilePhone" value={housingExpenses.mobilePhone} onChange={handleHousingExpenseChange} dir="rtl" />
                  <span>₪</span>
                </label>
                <label>חבילת שירותי תקשורת וטלוויזיה:
                  <input type="text" name="tvPackage" value={housingExpenses.tvPackage} onChange={handleHousingExpenseChange} dir="rtl" />
                  <span>₪</span>
                </label>
                <label>טלפון ביתי:
                  <input type="text" name="landlinePhone" value={housingExpenses.landlinePhone} onChange={handleHousingExpenseChange} dir="rtl" />
                  <span>₪</span>
                </label>
                <label>אינטרנט:
                  <input type="text" name="internet" value={housingExpenses.internet} onChange={handleHousingExpenseChange} dir="rtl" />
                  <span>₪</span>
                </label>
                <label>תיקונים ותחזוקה:
                  <input type="text" name="repairsMaintenance" value={housingExpenses.repairsMaintenance} onChange={handleHousingExpenseChange} dir="rtl" />
                  <span>₪</span>
                </label>
                <label>עוזרת בית:
                  <input type="text" name="houseCleaning" value={housingExpenses.houseCleaning} onChange={handleHousingExpenseChange} dir="rtl" />
                  <span>₪</span>
                </label>
                <label>ריהוט ואלקטרוניקה:
                  <input type="text" name="furnitureElectronics" value={housingExpenses.furnitureElectronics} onChange={handleHousingExpenseChange} dir="rtl" />
                  <span>₪</span>
                </label>

                {extraIncomeFields.map((value, index) => (
                  <label key={index}>הוצאה נוספת כללית:
                    <input type="text" value={value} onChange={(e) => handleExtraIncomeChange(index, e.target.value)} dir="rtl" />
                    <span>₪</span>
                  </label>
                ))}

                <button onClick={addExtraIncomeRow} className="add-expense-button">+ הוסף שורה חדשה</button>
              </div>

              <div className="total-expenses">
                <h3>סה"כ הוצאות: ₪{totalHousingExpenses}</h3>
              </div>
            </div>
          )}
        </div>
      </div>
    </Router>
  );
}

export default App;
