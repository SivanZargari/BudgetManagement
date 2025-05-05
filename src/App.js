import React, { useEffect, useState } from 'react';
import { googleSignIn, googleSignOut, auth } from './firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import FinancialChart from "./FinancialChart";
import emailjs from "@emailjs/browser";
import { saveSummaryData } from './firebase/firebase';
import { getSummaryData } from './firebase/firebase'; // ייבוא הפונקציה
import { getAuth } from "firebase/auth";
import WheelOfTips from './WheelOfTips';
import MemoryGame from './MemoryGame';
import PuzzleTips from './PuzzleTips';


function App() {
  const [user, setUser] = useState(null);
  const [summaries, setSummaries] = useState([]);
  const [userEmail, setUserEmail] = useState(null); // מייל של המשתמש המחובר
  const [isDataLoaded, setIsDataLoaded] = useState(false); // אם הנתונים הועלו
  const [showWheel, setShowWheel] = useState(false);
  const [showMemoryGame, setShowMemoryGame] = useState(false);
  const [showPuzzleTips, setShowPuzzleTips] = useState(false);

  // פונקציה שמבצע את פעולת הלחיצה על הכפתור
  const handleWheelClick = () => {
    setShowWheel(true);  // שינוי הסטייט כדי להציג את הגלגל
  };

  // פונקציה שמבצע את פעולת הלחיצה על כפתור המשחק
  const handleMemoryGameClick = () => {
    setShowMemoryGame(true); // שינוי הסטייט כדי להציג את המשחק
    setShowWheel(false); // אם המשחק מוצג, נסיר את גלגל הטיפים
  };

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

  const [livingExpenses, setLivingExpenses] = useState({
    supermarket: '',
    foodWorkStudy: '',
    nationalInsurance: '',
    medicalEquipment: '',
    healthInsurance: '',
    privateHealthInsurance: '',
    dentalTreatment: '',
    lifeInsurance: '',
    contactLenses: '',
    nursingInsurance: '',
    professionalConsultation: '',
    childcare: '',
    schoolFees: '',
    clothes: '',
    toysBooks: '',
    hobbies: '',
    pocketMoney: '',
    alimony: '',
    cleaningServices: '',
    petExpenses: '',
    medicalCare: '',
    petInsurance: ''
  });

  const [vehicleExpenses, setVehicleExpenses] = useState({
    carInsurance: '',
    carRental: '',
    carMaintenance: '',
    fuel: '',
    parkingTollsFines: '',
    publicTransport: '',
    vehicleLicenseAndDriverLicense: '',
    loanRepayment: '',
  });

  const [entertainmentExpenses, setEntertainmentExpenses] = useState({
    culturalSportsEvents: '',
    gymPoolSubscription: '',
    newspapersMagazines: '',
    hobbiesTrips: '',
    diningOutRestaurants: '',
    cigarettesAlcohol: '',
    eventsGifts: '',
    donations: '',
    holidaysTrips: '',
    holidayShopping: '',
    travelInsurance: '',
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

  useEffect(() => {
    const fetchData = async () => {
      const data = await getSummaryData(); // שליפת הנתונים מ-Firebase
      setSummaries(data); // עדכון המצב עם הנתונים
    };
    fetchData();
  }, []);

  useEffect(() => {
    // אם המשתמש מחובר, קבל את המייל שלו
    const auth = getAuth();
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUserEmail(currentUser.email);
    } else {
      setUserEmail(null); // אם לא מחובר, נקה את המייל
    }
  }, [user]);

  useEffect(() => {
    const fetchData = async () => {
      if (userEmail) {  // אם המשתמש מחובר, סנן את הנתונים לפי המייל שלו
        const data = await getSummaryData();
        const userSummary = data.filter(
          (summary) => summary.userEmail === userEmail // סנן את הנתונים לפי המייל של המשתמש המחובר
        );
        setSummaries(userSummary); // עדכן את הסטייט עם הנתונים המסוננים
      }
    };
    fetchData();
  }, [userEmail]); // ריצה מחדש אם ה-userEmail משתנה

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

  const handleLivingExpenseChange = (event) => {
    if (!user) {
      alert("יש להתחבר על מנת לבצע ניהול חכם של הכסף שלך");
      return;
    }

    const { name, value } = event.target;
    if (/^\d*$/.test(value)) {
      setLivingExpenses((prevLivingExpenses) => ({
        ...prevLivingExpenses,
        [name]: value,
      }));
    }
  };

  // פונקציות עדכון שונות...
  const handleVehicleExpenseChange = (event) => {
    if (!user) {
      alert("יש להתחבר על מנת לבצע ניהול חכם של הכסף שלך");
      return;
    }

    const { name, value } = event.target;
    if (/^\d*$/.test(value)) {
      setVehicleExpenses((prevExpenses) => ({
        ...prevExpenses,
        [name]: value,
      }));
    }
  };

  const handleEntertainmentExpenseChange = (event) => {
    if (!user) {
      alert("יש להתחבר על מנת לבצע ניהול חכם של הכסף שלך");
      return;
    }

    const { name, value } = event.target;
    if (/^\d*$/.test(value)) {
      setEntertainmentExpenses((prevEntertainmentExpenses) => ({
        ...prevEntertainmentExpenses,
        [name]: value,
      }));
    }
  };

  const isAnyFieldFilled = () => {
    const fields = [
      ...Object.values(income),
      ...Object.values(expenses),
      ...Object.values(housingExpenses),
      ...Object.values(livingExpenses),
      ...Object.values(vehicleExpenses),
      ...Object.values(entertainmentExpenses),
      ...extraIncomeFields
    ];
    return fields.some(field => field !== ''); // מחזיר true אם יש לפחות שדה אחד עם ערך
  };


  const sendEmail = (userEmail, summaryData) => {
    const templateParams = {
      to_name: "משתמש יקר",
      to_email: userEmail,
      summaryData: summaryData
    };

    emailjs
      .send(
        "service_ohm9sz3",
        "template_64418bh",
        templateParams,
        "N2fPQZQqbuTQiAg7r"
      )
      .then(
        (response) => {
          console.log("Email sent successfully!", response.status, response.text);
          alert("המייל נשלח בהצלחה!");

          // שמירת הנתונים ב-Firebase
          saveSummaryData(userEmail, summaryData);  // הוספת הנתונים ב-Firebase
        },
        (error) => {
          console.log("Failed to send email:", error);
          alert("שגיאה בשליחת המייל, נסה שוב!");
        }
      );
  };

  const handleLoadData = async () => {
    // ודא שהמשתמש מחובר
    if (userEmail) {
      const data = await getSummaryData(); // שלוף את כל הנתונים מ-Firebase
      const userSummary = data.filter(
        (summary) => summary.userEmail === userEmail // סנן את הנתונים לפי המייל של המשתמש המחובר
      );
      setSummaries(userSummary); // עדכן את הסטייט עם הנתונים המסוננים
      setIsDataLoaded(true);
    }
  };

  const handlePuzzleTipsClick = () => {
    setShowPuzzleTips(true);
    setShowMemoryGame(false);
    setShowWheel(false);
  };


  const totalIncome = Object.values(income)
    .reduce((acc, curr) => acc + (parseInt(curr) || 0), 0) + extraIncomeFields.reduce((acc, curr) => acc + (parseInt(curr) || 0), 0);

  const totalExpenses = Object.values(expenses)
    .reduce((acc, curr) => acc + (parseInt(curr) || 0), 0) + extraIncomeFields.reduce((acc, curr) => acc + (parseInt(curr) || 0), 0);

  const totalHousingExpenses = Object.values(housingExpenses)
    .reduce((acc, curr) => acc + (parseInt(curr) || 0), 0) + extraIncomeFields.reduce((acc, curr) => acc + (parseInt(curr) || 0), 0);

  const totallivingExpenses = Object.values(livingExpenses)
    .reduce((acc, curr) => acc + (parseInt(curr) || 0), 0) + extraIncomeFields.reduce((acc, curr) => acc + (parseInt(curr) || 0), 0);

  const totalvehicleExpenses = Object.values(vehicleExpenses)
    .reduce((acc, curr) => acc + (parseInt(curr) || 0), 0) + extraIncomeFields.reduce((acc, curr) => acc + (parseInt(curr) || 0), 0);

  const totalEntertainmentExpenses = Object.values(entertainmentExpenses)
    .reduce((acc, curr) => acc + (parseInt(curr) || 0), 0) + extraIncomeFields.reduce((acc, curr) => acc + (parseInt(curr) || 0), 0);

  return (
    <Router>
      <div className="App">
        {showWheel ? (
          <WheelOfTips />
        ) : showMemoryGame ? (
          <MemoryGame />
        ) : showPuzzleTips ? (
          <PuzzleTips />
        ) : (
          <div>
            <h1>ניהול תקציב</h1>
            <h3>!אל תיתן לכסף לנהל אותך – נהל אותו בעצמך</h3>

            <div className="text-block">
              <p>
                ניהול משק בית דומה לניהול עסק – <br />
                כדי לשמור על איזון כלכלי, חשוב לדעת בדיוק מהן ההכנסות ומהן ההוצאות. <br />
                שמירה על תקציב מסודר תסייע לכם להימנע מחובות והוצאות מיותרות, <br />
                ותאפשר לכם לחסוך ולהגשים מטרות וחלומות. <br />
                כמו בכל תחום בחיים, ברגע שמתחילים לנהל תקציב באופן עקבי, <br />
                זה הופך להרגל חיובי שמוביל לשקט כלכלי. <br />
              </p>
            </div>
            {/* כפתור שמוביל להצגת גלגל המזל */}
            <button onClick={handleWheelClick} className="tip-button">
              גלגל הטיפים לחסכון
            </button>

            {/* כפתור שמוביל לעמוד המשחק */}
            <button onClick={handleMemoryGameClick} className="tip-button">
              משחק זיכרון
            </button>

            {/* כפתור שמוביל למשחק הטיפים החדש */}
            <button onClick={handlePuzzleTipsClick} className="tip-button">
              חידון התקציב
            </button>

          </div>
        )}

        {user ? (
          <button onClick={googleSignOut} className="logout">התנתק מחשבון</button>
        ) : (
          <button onClick={googleSignIn}> Google התחבר עם</button>
        )}

        {user && summaries.length > 0 ? (
          <div className="summaries-container" style={{ maxHeight: '400px', overflowY: 'auto' }}>

            <ul className="summaries-list">
              {summaries.map((summary) => (
                <li key={summary.id} className="summary-item">
                  <div className="summary-email">{summary.userEmail}</div>
                  <div className="summary-data">
                    {typeof summary.summaryData === 'string' ?
                      summary.summaryData.split('\n').map((line, index) => (
                        <div key={index} className="summary-line">{line}</div>
                      )) :
                      JSON.stringify(summary.summaryData)}
                  </div>
                </li>
              ))}
            </ul>
          </div>

        ) : user ? (
          <p>אין נתונים זמינים עבור המשתמש המחובר</p>
        ) : (
          <p>עליך להתחבר כדי לראות נתונים קודמים</p>
        )}



        <div className="income-section" dir="rtl">
          <nav className="navbar">
            <ul>
              <li><Link to="/" onClick={() => setActivePage('income')}>הכנסות חודשיות</Link></li>
              <li><Link to="/page2" onClick={() => setActivePage('page2')}>הוצאות ניהוליות </Link></li>
              <li><Link to="/page3" onClick={() => setActivePage('page3')}>הוצאות מגורים</Link></li>
              <li><Link to="/page4" onClick={() => setActivePage('page4')}>הוצאות מחיה ותחזוקה שוטפת</Link></li>
              <li><Link to="/page5" onClick={() => setActivePage('page5')}>הוצאות נסיעה ורכב</Link></li>
              <li><Link to="/page6" onClick={() => setActivePage('page6')}>הוצאות פנאי ובילויים</Link></li>
              <li><Link to="/page7" onClick={() => setActivePage('page7')} className={isAnyFieldFilled() ? '' : 'disabled'}>מה הסיכום הפיננסי לחודש זה?</Link></li>
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

                <h5 className="extra-income-title">שכחנו משהו?</h5>
                <label>הכנסה נוספת כללית:
                  <input type="text" name="otherIncome" value={income.otherIncome} onChange={handleIncomeChange} dir="rtl" />
                  <span>₪</span>
                </label>

                {/*{extraIncomeFields.map((value, index) => (
                  <label key={index}>הוצאה נוספת כללית:
                    <input type="text" value={value} onChange={(e) => handleExtraIncomeChange(index, e.target.value)} dir="rtl" />
                    <span>₪</span>
                  </label>
                ))}

                <button onClick={addExtraIncomeRow} className="add-expense-button">+ הוסף עוד שורה</button>*/}
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

                {/*{extraIncomeFields.map((value, index) => (
                  <label key={index}>הוצאה נוספת כללית:
                    <input type="text" value={value} onChange={(e) => handleExtraIncomeChange(index, e.target.value)} dir="rtl" />
                    <span>₪</span>
                  </label>
                ))}

                <button onClick={addExtraIncomeRow} className="add-expense-button">+ הוסף עוד שורה</button>*/}
              </div>

              <div className="total-expenses">
                <h3>סה"כ הוצאות ניהוליות: ₪{totalExpenses} </h3>
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

                {/*{extraIncomeFields.map((value, index) => (
                  <label key={index}>הוצאה נוספת כללית:
                    <input type="text" value={value} onChange={(e) => handleExtraIncomeChange(index, e.target.value)} dir="rtl" />
                    <span>₪</span>
                  </label>
                ))}

                <button onClick={addExtraIncomeRow} className="add-expense-button">+ הוסף עוד שורה</button>*/}
              </div>

              <div className="total-expenses">
                <h3>סה"כ הוצאות מגורים: ₪{totalHousingExpenses}</h3>
              </div>
            </div>
          )}

          {activePage === 'page4' && (
            <div>
              <h2>הוצאות מחיה ותחזוקה שוטפת</h2>
              <h4> צרכים יומיומיים, בריאות, חינוך ותחזוקה אישית</h4>
              <div className="expense-inputs">
                <label>קניות בסופר, במכולת ובשוק:
                  <input type="text" name="supermarket" value={livingExpenses.supermarket} onChange={handleLivingExpenseChange} dir="rtl" />
                  <span>₪</span>
                </label>
                <label>אוכל בלימודים ובעבודה:
                  <input type="text" name="foodWorkStudy" value={livingExpenses.foodWorkStudy} onChange={handleLivingExpenseChange} dir="rtl" />
                  <span>₪</span>
                </label>
                <label>ביטוח לאומי ומס בריאות:
                  <input type="text" name="nationalInsurance" value={livingExpenses.nationalInsurance} onChange={handleLivingExpenseChange} dir="rtl" />
                  <span>₪</span>
                </label>
                <label>תרופות, יעוץ וציוד רפואי:
                  <input type="text" name="medicalEquipment" value={livingExpenses.medicalEquipment} onChange={handleLivingExpenseChange} dir="rtl" />
                  <span>₪</span>
                </label>
                <label>קופ"ח וביטוחים משלימים:
                  <input type="text" name="healthInsurance" value={livingExpenses.healthInsurance} onChange={handleLivingExpenseChange} dir="rtl" />
                  <span>₪</span>
                </label>
                <label>ביטוח בריאות פרטי:
                  <input type="text" name="privateHealthInsurance" value={livingExpenses.privateHealthInsurance} onChange={handleLivingExpenseChange} dir="rtl" />
                  <span>₪</span>
                </label>
                <label>טיפולי שיניים:
                  <input type="text" name="dentalTreatment" value={livingExpenses.dentalTreatment} onChange={handleLivingExpenseChange} dir="rtl" />
                  <span>₪</span>
                </label>
                <label>ביטוח חיים ואובדן כושר עבודה:
                  <input type="text" name="lifeInsurance" value={livingExpenses.lifeInsurance} onChange={handleLivingExpenseChange} dir="rtl" />
                  <span>₪</span>
                </label>
                <label>עדשות, חומרי ניקוי לעדשות ומשקפיים:
                  <input type="text" name="contactLenses" value={livingExpenses.contactLenses} onChange={handleLivingExpenseChange} dir="rtl" />
                  <span>₪</span>
                </label>
                <label>ביטוח סיעודי:
                  <input type="text" name="nursingInsurance" value={livingExpenses.nursingInsurance} onChange={handleLivingExpenseChange} dir="rtl" />
                  <span>₪</span>
                </label>
                <label>יעוץ מקצועי:
                  <input type="text" name="professionalConsultation" value={livingExpenses.professionalConsultation} onChange={handleLivingExpenseChange} dir="rtl" />
                  <span>₪</span>
                </label>
                <label>טיפול בילדים (מעון, גן, מטפלת, בייביסיטר וכו'):
                  <input type="text" name="childcare" value={livingExpenses.childcare} onChange={handleLivingExpenseChange} dir="rtl" />
                  <span>₪</span>
                </label>
                <label>שכר לימוד ביה"ס, הכשרה מקצועית או השכלה גבוהה:
                  <input type="text" name="schoolFees" value={livingExpenses.schoolFees} onChange={handleLivingExpenseChange} dir="rtl" />
                  <span>₪</span>
                </label>
                <label>בגדים, נעליים ואביזרי לבוש:
                  <input type="text" name="clothes" value={livingExpenses.clothes} onChange={handleLivingExpenseChange} dir="rtl" />
                  <span>₪</span>
                </label>
                <label>צעצועים וספרים:
                  <input type="text" name="toysBooks" value={livingExpenses.toysBooks} onChange={handleLivingExpenseChange} dir="rtl" />
                  <span>₪</span>
                </label>
                <label>חוגים, תנועת נוער, פעילויות וקייטנות:
                  <input type="text" name="hobbies" value={livingExpenses.hobbies} onChange={handleLivingExpenseChange} dir="rtl" />
                  <span>₪</span>
                </label>
                <label>דמי כיס:
                  <input type="text" name="pocketMoney" value={livingExpenses.pocketMoney} onChange={handleLivingExpenseChange} dir="rtl" />
                  <span>₪</span>
                </label>
                <label>תשלום דמי מזונות:
                  <input type="text" name="alimony" value={livingExpenses.alimony} onChange={handleLivingExpenseChange} dir="rtl" />
                  <span>₪</span>
                </label>
                <label>ביגוד, הנעלה ואביזרים:
                  <input type="text" name="cleaningServices" value={livingExpenses.cleaningServices} onChange={handleLivingExpenseChange} dir="rtl" />
                  <span>₪</span>
                </label>
                <label>תספורת:
                  <input type="text" name="petExpenses" value={livingExpenses.petExpenses} onChange={handleLivingExpenseChange} dir="rtl" />
                  <span>₪</span>
                </label>
                <label>טיפוח וקוסמטיקה:
                  <input type="text" name="medicalCare" value={livingExpenses.medicalCare} onChange={handleLivingExpenseChange} dir="rtl" />
                  <span>₪</span>
                </label>
                <label>מכבסה וניקוי יבש:
                  <input type="text" name="petInsurance" value={livingExpenses.petInsurance} onChange={handleLivingExpenseChange} dir="rtl" />
                  <span>₪</span>
                </label>

                {/*{extraIncomeFields.map((value, index) => (
                  <label key={index}>הוצאה נוספת כללית:
                    <input type="text" value={value} onChange={(e) => handleExtraIncomeChange(index, e.target.value)} dir="rtl" />
                    <span>₪</span>
                  </label>
                ))}

                <button onClick={addExtraIncomeRow} className="add-expense-button">+ הוסף עוד שורה</button>*/}

              </div>

              <div className="total-expenses">
                <h3>סה"כ הוצאות מחיה ותחזוקה שוטפת: ₪{totallivingExpenses}</h3>
              </div>
            </div>
          )}

          {activePage === 'page5' && (
            <div>
              <h2>הוצאות נסיעה ורכב</h2>
              <h4>כלל העלויות הנלוות לניהול ותחזוקת הרכב</h4>
              <div className="expense-inputs">
                <label>ביטוח רכב:
                  <input type="text" name="carInsurance" value={vehicleExpenses.carInsurance} onChange={handleVehicleExpenseChange} dir="rtl" />
                  <span>₪</span>
                </label>
                <label>השכרת רכב:
                  <input type="text" name="carRental" value={vehicleExpenses.carRental} onChange={handleVehicleExpenseChange} dir="rtl" />
                  <span>₪</span>
                </label>
                <label>תחזוקה ותיקונים:
                  <input type="text" name="carMaintenance" value={vehicleExpenses.carMaintenance} onChange={handleVehicleExpenseChange} dir="rtl" />
                  <span>₪</span>
                </label>
                <label>דלק:
                  <input type="text" name="fuel" value={vehicleExpenses.fuel} onChange={handleVehicleExpenseChange} dir="rtl" />
                  <span>₪</span>
                </label>
                <label>חניה, אגרות נסיעה, קנסות ודוחות:
                  <input type="text" name="parkingTollsFines" value={vehicleExpenses.parkingTollsFines} onChange={handleVehicleExpenseChange} dir="rtl" />
                  <span>₪</span>
                </label>
                <label>תחבורה ציבורית:
                  <input type="text" name="publicTransport" value={vehicleExpenses.publicTransport} onChange={handleVehicleExpenseChange} dir="rtl" />
                  <span>₪</span>
                </label>
                <label>רישיון רכב (טסט) ונהיגה:
                  <input type="text" name="vehicleLicenseAndDriverLicense" value={vehicleExpenses.vehicleLicenseAndDriverLicense} onChange={handleVehicleExpenseChange} dir="rtl" />
                  <span>₪</span>
                </label>
                <label>החזר הלואות רכב:
                  <input type="text" name="loanRepayment" value={vehicleExpenses.loanRepayment} onChange={handleVehicleExpenseChange} dir="rtl" />
                  <span>₪</span>
                </label>

                {/*{extraIncomeFields.map((value, index) => (
                  <label key={index}>הוצאה נוספת כללית:
                    <input type="text" value={value} onChange={(e) => handleExtraIncomeChange(index, e.target.value)} dir="rtl" />
                    <span>₪</span>
                  </label>
                ))}

                <button onClick={addExtraIncomeRow} className="add-expense-button">+ הוסף עוד שורה</button>*/}

              </div>

              <div className="total-expenses">
                <h3>סה"כ הוצאות נסיעה ורכב: ₪{totalvehicleExpenses}</h3>
              </div>
            </div>
          )}


          {activePage === 'page6' && (
            <div>
              <h2>הוצאות פנאי ובילויים</h2>
              <h4>הוצאות פנאי, בילויים ונופש – מהיומיום ועד לחופשות</h4>
              <div className="expense-inputs">
                <label>מופעי תרבות וספורט:
                  <input type="text" name="culturalSportsEvents" value={entertainmentExpenses.culturalSportsEvents} onChange={handleEntertainmentExpenseChange} dir="rtl" />
                  <span>₪</span>
                </label>
                <label>מנוי לחדר כושר ובריכה:
                  <input type="text" name="gymPoolSubscription" value={entertainmentExpenses.gymPoolSubscription} onChange={handleEntertainmentExpenseChange} dir="rtl" />
                  <span>₪</span>
                </label>
                <label>עיתונים ומגזינים:
                  <input type="text" name="newspapersMagazines" value={entertainmentExpenses.newspapersMagazines} onChange={handleEntertainmentExpenseChange} dir="rtl" />
                  <span>₪</span>
                </label>
                <label>תחביבים, טיולים - הורים וילדים:
                  <input type="text" name="hobbiesTrips" value={entertainmentExpenses.hobbiesTrips} onChange={handleEntertainmentExpenseChange} dir="rtl" />
                  <span>₪</span>
                </label>
                <label>בילויים, מסעדות, משלוחים ובתי קפה:
                  <input type="text" name="diningOutRestaurants" value={entertainmentExpenses.diningOutRestaurants} onChange={handleEntertainmentExpenseChange} dir="rtl" />
                  <span>₪</span>
                </label>

                {/*{extraIncomeFields.map((value, index) => (
                  <label key={index}>הוצאה נוספת כללית:
                    <input type="text" value={value} onChange={(e) => handleExtraIncomeChange(index, e.target.value)} dir="rtl" />
                    <span>₪</span>
                  </label>
                ))}

                <button onClick={addExtraIncomeRow} className="add-expense-button">+ הוסף עוד שורה</button>*/}
              </div>

              <div className="total-expenses">
                <h3>סה"כ הוצאות פנאי ובילויים: ₪{totalEntertainmentExpenses}</h3>
              </div>
            </div>
          )}


          {activePage === 'page7' && (
            <div>
              <h2> סיכום פיננסי לחודש זה</h2>
              <h3>הכנסות והוצאות חושבו – איך זה משפיע על התקציב שלך?</h3>
              <div className="totals">
                <div className="total-income">
                  <h4>סך ההכנסות שלכם</h4>
                  <p>₪{totalIncome}</p>
                </div>
                <div className="total-expenses">
                  <h4>סך ההוצאות שלכם</h4>
                  <p>₪{totalExpenses + totalHousingExpenses + totallivingExpenses + totalvehicleExpenses + totalEntertainmentExpenses}</p>

                  <FinancialChart totalIncome={totalIncome} totalExpenses={totalExpenses + totalHousingExpenses + totallivingExpenses + totalvehicleExpenses + totalEntertainmentExpenses} />

                  <h3 className={totalIncome > totalExpenses + totalHousingExpenses + totallivingExpenses + totalvehicleExpenses + totalEntertainmentExpenses ? 'green-message' :
                    totalIncome < totalExpenses + totalHousingExpenses + totallivingExpenses + totalvehicleExpenses + totalEntertainmentExpenses ? 'red-message' : 'black-message'}>
                    {totalIncome > totalExpenses + totalHousingExpenses + totallivingExpenses + totalvehicleExpenses + totalEntertainmentExpenses
                      ? "יש לך עודף כספי החודש!👍🏽"
                      : totalIncome < totalExpenses + totalHousingExpenses + totallivingExpenses + totalvehicleExpenses + totalEntertainmentExpenses
                        ? "שים לב! ההוצאות שלך גבוהות מההכנסות👎🏽"
                        : "ההכנסות וההוצאות שלך מאוזנות ☺️"}
                  </h3>

                  <button onClick={() => {
                    // יצירת אובייקט עם נתוני הסיכום
                    const mySummaryData = {
                      totalIncome,
                      totalExpenses: totalExpenses + totalHousingExpenses + totallivingExpenses + totalvehicleExpenses + totalEntertainmentExpenses,
                      balanceMessage: totalIncome > totalExpenses + totalHousingExpenses + totallivingExpenses + totalvehicleExpenses + totalEntertainmentExpenses
                        ? "כל הכבוד 👍🏽 - יש לך עודף כספי החודש"
                        : totalIncome < totalExpenses + totalHousingExpenses + totallivingExpenses + totalvehicleExpenses + totalEntertainmentExpenses
                          ? "שים לב! 👎🏽 - ההוצאות שלך גבוהות מההכנסות"
                          : " אין כמו איזון ☺️ - ההכנסות וההוצאות מאוזנות "
                    };

                    // עיצוב המייל ב-HTML
                    const emailContent = `
                      סך ההכנסות שלך: ₪${mySummaryData.totalIncome}
                     סך ההוצאות שלך: ₪${mySummaryData.totalExpenses}
                     סטטוס פיננסי: ${mySummaryData.balanceMessage}
          `;

                    // שליחת המייל
                    sendEmail(user?.email, emailContent);
                  }}>
                    שלח לעצמי במייל
                  </button>

                </div>
              </div>
            </div>

          )}

        </div>
      </div>

    </Router>
  );
}

export default App;
