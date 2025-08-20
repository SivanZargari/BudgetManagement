import React, { useState } from 'react';
import './PuzzleTips.css';

const questions = [
    {
      id: 1,
      text: 'מה הדרך הכי טובה לחסוך בהוצאות חודשיות?',
      options: [
        'למנוע הוצאות על קניות לא נחוצות',
        'לקנות יותר במבצע',
        'לשתות קפה חינם בעבודה',
        'לצאת יותר למסעדות',
        'למכור חפצים ישנים',
        'לקנות פחות בגדים ומוצרי אופנה',
        'לא לשלם חשבונות בזמן כדי לחסוך כסף',
        'לסגור את כל כרטיסי האשראי ולהימנע מקניות',
      ],
      correct: 'למנוע הוצאות על קניות לא נחוצות',
      explanation: 'מניעת הוצאות על קניות לא נחוצות היא הדרך הטובה ביותר לחסוך בכסף.',
    },
    {
      id: 2,
      text: 'מהו אחד הצעדים הראשונים כשמתחילים לחסוך?',
      options: [
        'לפתח תקציב חודשי',
        'לשלם יותר מיסים כדי להימנע מקנסות',
        'לעבוד בשתי עבודות במקביל',
        'לקנות מוצרי מותג זולים',
        'למכור רהיטים ישנים ולחסוך את הכסף',
        'לשמור את כל הכסף במזומן בלבד',
        'להשקיע את כל הכסף במניות',
        'לשים את כל הכסף בחשבון חיסכון נטול ריבית',
      ],
      correct: 'לפתח תקציב חודשי',
      explanation: 'הדבר הראשון שצריך לעשות כשמתחילים לחסוך הוא לדעת איך לנהל את התקציב החודשי שלך.',
    },
    {
      id: 4,
      text: 'איזה צעד הכי חשוב כדי לא להיות במינוס כל חודש?',
      options: [
        'ליצור תקציב חודשי ולשמור עליו',
        'לשלם את כל ההוצאות על כרטיסי אשראי',
        'לקנות רק במבצעים גדולים',
        'למכור את הרכב ולהתנייד בתחבורה ציבורית',
        'להימנע מקניות בכל תקופה של חודש',
        'לא להוציא כסף על אוכל אלא לאכול בחינם',
        'לעבוד במשרות נוספות מבלי לנוח',
        'להשקיע את כל הכסף בכספי מזומן בלבד',
      ],
      correct: 'ליצור תקציב חודשי ולשמור עליו',
      explanation: 'יצירת תקציב חודשי והשגת שליטה על ההוצאות תעזור לך להימנע ממינוס.',
    },
    {
      id: 5,
      text: 'איזה סוג של חיסכון כדאי לעשות לפנסיה?',
      options: [
        'לחסוך לפנסיה באופן חודשי',
        'לקנות מניות במניות בתחום האופנה',
        'למכור חפצים ישנים ולחסוך את הכסף',
        'לא להשקיע בפנסיה כי זה מיותר',
        'לשמור את הכסף במזומן מתחת למזרן',
        'לא לשים כסף בפנסיה, אלא להשקיע בשוק ההון',
        'לשלם רק חובות ולא לחסוך לפנסיה',
        'להשקיע את כל הכסף בנדל"ן',
      ],
      correct: 'לחסוך לפנסיה באופן חודשי',
      explanation: 'חיסכון חודשי לפנסיה הוא הדרך הטובה ביותר להבטיח עתיד פיננסי בטוח.',
    },
    {
      id: 6,
      text: 'מהי הדרך הטובה ביותר למנוע הוצאות מיותרות על אוכל?',
      options: [
        'לקנות רק קפואים ומעובדים',
        'לקנות אוכל לפי רשימה ולא על פי חפצים מיותרים',
        'לא לבשל ולא להכין אוכל בבית',
        'לא לקנות ירקות ופירות טריים',
        'לקנות במבצע כל מוצר גם אם הוא לא דרוש',
        'לשמור את כל האוכל במקפיא ולהימנע מלהכין אוכל טרי',
        'לא לאכול אוכל בריא כמו ירקות',
        'לא להכין אוכל בבית ולהזמין כל הזמן אוכל מוכן',
      ],
      correct: 'לקנות אוכל לפי רשימה ולא על פי חפצים מיותרים',
      explanation: 'תכנון מראש והכנת רשימה יכולה לחסוך הרבה כסף בהוצאות על אוכל.',
    },
    {
      id: 7,
      text: 'מהו הצעד הראשון בתהליך חיסכון לאזרחי הגיל השלישי?',
      options: [
        'ליצור תוכנית חיסכון לפנסיה',
        'לא לשלם מיסים כדי לחסוך כסף',
        'למכור את הבית ולקנות דירה קטנה יותר',
        'לעבוד יותר שעות כדי להרוויח יותר כסף',
        'למנוע הוצאות על תרופות',
        'לשלם חובות במהרה',
        'לסגור את כל כרטיסי האשראי',
        'לשמור את הכסף בבית ולהימנע מחשבונות בנק',
      ],
      correct: 'ליצור תוכנית חיסכון לפנסיה',
      explanation: 'תוכנית חיסכון לפנסיה היא הדרך הבטוחה ביותר להבטיח עתיד פיננסי טוב יותר.',
    },
  ];

  const PuzzleTips = () => {
    const [started, setStarted] = useState(false);
    const [current, setCurrent] = useState(0);
    const [selected, setSelected] = useState(null);
    const [showResult, setShowResult] = useState(false);
    const [score, setScore] = useState(0); // ניקוד
  
    const handleOptionClick = (option) => {
      setSelected(option);
      setShowResult(true);
      if (option === questions[current].correct) {
        setScore(prev => prev + 1);
      }
    };
  
    const nextQuestion = () => {
      setSelected(null);
      setShowResult(false);
      setCurrent(prev => prev + 1);
    };
  
    const resetGame = () => {
      setStarted(false);
      setCurrent(0);
      setSelected(null);
      setShowResult(false);
      setScore(0);
    };
  
    const question = questions[current];
  

  
    return (
      <div className="puzzle-container">
        <h2> חידון התקציב 📊</h2>
        <p className="question-counter">שאלה {current + 1} מתוך {questions.length}</p>
        <p>{question.text}</p>
  
        <div className="options">
          {question.options.map((opt, index) => (
            <button
              key={index}
              onClick={() => handleOptionClick(opt)}
              disabled={showResult}
              className={
                showResult
                  ? opt === question.correct
                    ? 'correct'
                    : opt === selected
                    ? 'incorrect'
                    : ''
                  : ''
              }
            >
              {opt}
            </button>
          ))}
        </div>
  
        {showResult && (
          <div className="result">
            {selected === question.correct ? (
              <p> נכון!✅ {question.explanation}</p>
            ) : (
              <p> לא נכון!❌ התשובה הנכונה היא: {question.correct}</p>
            )}
  
            {current < questions.length - 1 ? (
              <button onClick={nextQuestion}> לשאלה הבאה</button>
            ) : (
              <div className="final-screen">
                <p> סיימת את החידון!🎉</p>
                <p>הניקוד שלך: {score} מתוך {questions.length}</p>
                {score === questions.length ? (
                  <p>💪 כל הכבוד! שליטה מלאה בתקציב!</p>
                ) : score >= questions.length / 2 ? (
                  <p> יפה מאוד!👍יש לך הבנה טובה בכלכלה אישית.</p>
                ) : (
                  <p> אפשר לשפר - אולי שווה לעבור על החידון שוב 😊</p>
                )}
                <button onClick={resetGame}> נסה שוב 🔁</button>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };
  
  export default PuzzleTips;