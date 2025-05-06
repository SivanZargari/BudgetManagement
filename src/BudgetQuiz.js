import React, { useState } from 'react';
import { predict } from './tensorflowModel';
import './budgetQuiz.css'; 

const BudgetQuiz = () => {
    const [answers, setAnswers] = useState({
        checkAccountFrequency: 0,
        emergencyFund: 0,
        trackBudget: 0,
        savingsPercentage: 0,
        impulsePurchases: 0,
        financialStatus: 0,
    });

    const [prediction, setPrediction] = useState(null);

    const handleChange = (e) => {
        setAnswers({
            ...answers,
            [e.target.name]: parseInt(e.target.value),
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await predict(answers);
        setPrediction(result.dataSync());
    };

    return (
        <div className="budget-container">
            <h2>הערכה כלכלית</h2>
            <form onSubmit={handleSubmit} className="budget-form">
                <label>
                    כמה אתה עוקב אחרי ההוצאות שלך בכל חודש?
                    <select name="checkAccountFrequency" onChange={handleChange}>
                        <option value="1">1 - לא עוקב בכלל</option>
                        <option value="2">2 - עוקב באופן לא סדיר</option>
                        <option value="3">3 - עוקב מדי פעם</option>
                        <option value="4">4 - עוקב בצורה מסודרת, לפעמים שוכח</option>
                        <option value="5">5 - עוקב בצורה מסודרת ומדויקת</option>
                    </select>
                </label>

                <label>
                    עד כמה אתה מתכנן את התקציב החודשי שלך?
                    <select name="trackBudget" onChange={handleChange}>
                        <option value="1">1 - אין לי תקציב חודשי</option>
                        <option value="2">2 - יש לי רעיון כללי</option>
                        <option value="3">3 - מתכנן תקציב, לא תמיד עומד בו</option>
                        <option value="4">4 - מתכנן ומנסה לעמוד בו רוב הזמן</option>
                        <option value="5">5 - מתכנן תקציב ועומד בו</option>
                    </select>
                </label>

                <label>
                    כמה פעמים בשנה אתה מבצע רכישות ספונטניות?
                    <select name="impulsePurchases" onChange={handleChange}>
                        <option value="1">1 - כל הזמן</option>
                        <option value="2">2 - לעיתים קרובות</option>
                        <option value="3">3 - מדי פעם</option>
                        <option value="4">4 - רק אם צריך</option>
                        <option value="5">5 - כמעט אף פעם</option>
                    </select>
                </label>

                <label>
                    האם אתה מפקיד כסף לחיסכון?
                    <select name="savingsPercentage" onChange={handleChange}>
                        <option value="1">1 - לא חוסך בכלל</option>
                        <option value="2">2 - רק אם נשאר</option>
                        <option value="3">3 - מדי פעם</option>
                        <option value="4">4 - סדיר, לפעמים שוכח</option>
                        <option value="5">5 - סדיר כל חודש</option>
                    </select>
                </label>

                <label>
                    מהו הסכום שאתה שומר עבור קרן חירום?
                    <select name="emergencyFund" onChange={handleChange}>
                        <option value="1">1 - אין לי קרן חירום</option>
                        <option value="2">2 - מתכנן להתחיל</option>
                        <option value="3">3 - סכום קטן</option>
                        <option value="4">4 - עד 6 חודשים</option>
                        <option value="5">5 - יותר מ־6 חודשים</option>
                    </select>
                </label>

                <label>
                    איך אתה מרגיש לגבי מצבך הכלכלי?
                    <select name="financialStatus" onChange={handleChange}>
                        <option value="1">1 - חוסר שליטה</option>
                        <option value="2">2 - לחץ כלכלי</option>
                        <option value="3">3 - מקום לשיפור</option>
                        <option value="4">4 - מתנהל טוב</option>
                        <option value="5">5 - עתיד בטוח</option>
                    </select>
                </label>

                <button type="submit" className="submit-button">שלח תשובות</button>
            </form>

            {prediction && (
                <div className="prediction-result">
                    <p className="instruction-box">
                        הציון מציין את רמת ההתנהלות הכלכלית שלך, מ1 (מאתגר) עד 5 (מצוין)
                    </p>
                    <p>
                        <strong>חיזוי מצב כלכלי : <span>{prediction[0].toFixed(2)}</span></strong>
                    </p>

                    <p>
                        {
                            prediction[0] < 2 ? "מצב כלכלי מאתגר – כדאי לשקול ליווי או תוכנית תקציב." :
                                prediction[0] < 3 ? "יש מקום לשיפור – התחלה טובה, אבל צריך המשכיות." :
                                    prediction[0] < 4 ? "בינוני – אתה בכיוון הנכון, המשך לשפר." :
                                        prediction[0] < 4.6 ? "מצב טוב – ניהול תקציב חיובי." :
                                            "מצוין – כל הכבוד! המשך ככה."
                        }
                    </p>
                </div>
            )}
        </div>
    );
};

export default BudgetQuiz;
