import React, { useState } from 'react';
import { Wheel } from 'react-custom-roulette';
import './App.css';

const tips = [

  { option: 'הגבל הוצאות אוכל' },
  { option: 'חסוך בחשמל' },
  { option: 'קבע יעד חיסכון' },
  { option: 'קנה יד שנייה' },
  { option: 'הקפד על הנחות' },
  { option: 'השתמש בכסף מזומן' },
  { option: 'קנה בזמן מבצעים' },
  { option: 'הימנע מהלוואות ' },
  { option: 'השקעה בביטוח זול' },
  { option: 'עקוב אחרי תקציב' },
];

export default function WheelOfTips() {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [result, setResult] = useState('');

  const handleSpinClick = () => {
    const newPrizeNumber = Math.floor(Math.random() * tips.length);
    setPrizeNumber(newPrizeNumber);
    setMustSpin(true);
  };

  return (
    <div className="wheel-container">
      <h2 className="text-2xl font-bold mb-4"> 💰🎡גלגל הטיפים לחסכון</h2>
      <Wheel
        mustStartSpinning={mustSpin}
        prizeNumber={prizeNumber}
        data={tips}
        backgroundColors={['#FEEBCB', '#B2F5EA']}
        textColors={['#333']}
        onStopSpinning={() => {
          setMustSpin(false);
          setResult(tips[prizeNumber].option);
        }}
      />
      <button
        onClick={handleSpinClick}
        className="mt-6 px-6 py-2 bg-green-500 text-white rounded-full hover:bg-green-600"
      >
        סובב את הגלגל
      </button>

      {result && (
        <div className="mt-6 text-xl font-semibold text-purple-700">
          הטיפ שלך💡: {result}
        </div>
      )}
    </div>
  );
}
