import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

// רישום רכיבי Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const FinancialChart = ({ totalIncome, totalExpenses }) => {
  const data = {
    labels: ["הכנסות", "הוצאות"],
    datasets: [
      {
        label: "סכום בשקלים",
        data: [totalIncome, totalExpenses],
        backgroundColor: ["green", "red"],  // צבעים קבועים
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: "השוואה בין הכנסות להוצאות",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        suggestedMax: Math.max(totalIncome, totalExpenses) * 1.2,  // 20% רווח מעל הערך הגבוה ביותר

      },
    },
    
  };

  return <Bar data={data} options={options} />;
};

export default FinancialChart;
