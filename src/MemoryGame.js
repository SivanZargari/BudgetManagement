import React, { useState, useEffect } from 'react';
import './MemoryGame.css';

const cardData = [
    { id: 1, pairId: '1', text: 'קניית חטיף ב-6 ₪ ביום' },
    { id: 2, pairId: '1', text: '= 180 ₪ בחודש' },

    { id: 3, pairId: '2', text: 'קפה יומי ב-10 ₪' },
    { id: 4, pairId: '2', text: '= 300 ₪ בחודש' },

    { id: 5, pairId: '3', text: 'מונית פעם בשבוע (40 ₪)' },
    { id: 6, pairId: '3', text: '= 160 ₪ בחודש' },

    { id: 7, pairId: '4', text: 'קניית בגדים מיותרת ב-200 ₪ בחודש' },
    { id: 8, pairId: '4', text: '= 2,400 ₪ בשנה!' },

    { id: 9, pairId: '5', text: 'משקה אנרגיה יומי (8 ₪)' },
    { id: 10, pairId: '5', text: '= 240 ₪ בחודש' },

    { id: 11, pairId: '6', text: 'לא להביא אוכל מהבית' },
    { id: 12, pairId: '6', text: '= בזבוז של 500 ₪ בחודש' },
];


// מפה של צבעים לכל זוג תואם (pairId)
const pairColors = {
    '1': '#FFD700', // זהב
    '2': '#90EE90', // ירוק בהיר
    '3': '#ADD8E6', // תכלת
    '4': '#FFB6C1', // ורוד בהיר
    '5': '#FFA07A', // סלמון
    '6': '#DDA0DD', // סגול בהיר
};

const shuffleArray = (arr) => [...arr].sort(() => Math.random() - 0.5);

const MemoryGame = () => {
    const [cards, setCards] = useState([]);
    const [flipped, setFlipped] = useState([]);
    const [matched, setMatched] = useState([]);
    const [moves, setMoves] = useState(0);
    const [gameOver, setGameOver] = useState(false);

    const startGame = () => {
        setCards(shuffleArray(cardData));
        setFlipped([]);
        setMatched([]);
        setMoves(0);
        setGameOver(false);
    };

    useEffect(() => {
        startGame();
    }, []);

    useEffect(() => {
        if (matched.length === cardData.length / 2) {
            setGameOver(true);
        }
    }, [matched]);

    const handleClick = (card) => {
        if (flipped.length === 2 || flipped.includes(card.id) || matched.includes(card.pairId)) return;

        const newFlipped = [...flipped, card.id];
        setFlipped(newFlipped);

        if (newFlipped.length === 2) {
            const [firstId, secondId] = newFlipped;
            const firstCard = cards.find(c => c.id === firstId);
            const secondCard = cards.find(c => c.id === secondId);

            setMoves(prev => prev + 1);

            if (firstCard.pairId === secondCard.pairId) {
                setMatched(prev => [...prev, firstCard.pairId]);
            }

            setTimeout(() => setFlipped([]), 1000);
        }
    };

    return (
        <div className="game-container">
            <h2>🧠 משחק זיכרון כלכלי</h2>
            <p className="game-intro">
                כל הוצאה יומית מסתתרת מאחורי קלף – מצא את בן הזוג שלה וגלה כמה אפשר לחסוך
            </p>

            <p>מספר מהלכים: {moves}</p>

            <div className="cards-grid">
                {cards.map(card => (
                    <div
                        key={card.id}
                        className={`card ${flipped.includes(card.id) || matched.includes(card.pairId) ? 'flipped' : ''} ${matched.includes(card.pairId) ? 'matched' : ''}`}
                        style={{
                            backgroundColor: flipped.includes(card.id) || matched.includes(card.pairId) ? pairColors[card.pairId] : 'transparent'
                        }}
                        onClick={() => handleClick(card)}
                    >
                        <div className="card-inner">
                            <div className="card-front">💰</div>
                            <div className="card-back">{card.text}</div>
                        </div>
                    </div>

                ))}
            </div>

            {gameOver && (
                <div className="game-over">
                    🎉 כל הכבוד! סיימת את המשחק ב-{moves} מהלכים!<br />
                    💡 תזכור/י: גם הוצאה יומית קטנה יכולה להפוך לחיסכון גדול לאורך זמן!
                </div>
            )}


            <button onClick={startGame} className="restart-button">
                🔄 התחל מחדש
            </button>
        </div>
    );
};

export default MemoryGame;
