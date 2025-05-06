import * as tf from '@tensorflow/tfjs';

export async function predict(answers) {
  // ניצור את הקלט למודל מתוך התשובות
  const inputValues = Object.values(answers); // מערך של ערכים מספריים

  // נגדיר נתוני אימון פשוטים לצורך הדוגמה:
  const trainingInputs = [
    [1, 1, 1, 1, 1, 1],
    [2, 2, 2, 2, 2, 2],
    [3, 3, 3, 3, 3, 3],
    [4, 4, 4, 4, 4, 4],
    [5, 5, 5, 5, 5, 5]
  ];
  

  const trainingOutputs = [1, 2, 3, 4, 5]; // ניקוד רמת חיסכון מ-1 (נמוך) עד 5 (גבוה)

  const xs = tf.tensor2d(trainingInputs);
  const ys = tf.tensor1d(trainingOutputs);

  // בניית מודל פשוט
  const model = tf.sequential();
  model.add(tf.layers.dense({ units: 1, inputShape: [6] }));
  model.compile({ optimizer: 'sgd', loss: 'meanSquaredError' });

  // אימון המודל
  await model.fit(xs, ys, { epochs: 200 });

  // חיזוי לפי תשובות המשתמש
  const inputTensor = tf.tensor2d([inputValues]);
  const result = model.predict(inputTensor);

  return result; // יוחזר ל-BudgetQuiz
}
