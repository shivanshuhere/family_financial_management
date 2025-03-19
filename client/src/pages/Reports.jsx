import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/auth.context.jsx';
import axios from 'axios';
import { Pie, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register required Chart.js components
ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Reports = () => {
  const { user } = useContext(AuthContext);
  const [reportData, setReportData] = useState(null);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/reports', {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setReportData(response.data);
      } catch (error) {
        console.error('Error fetching financial report:', error);
      }
    };
    fetchReport();
  }, [user.token]);

  if (!reportData) return <p>Loading Report...</p>;

  // Data for Pie Chart
  const pieData = {
    labels: Object.keys(reportData.categoryBreakdown),
    datasets: [
      {
        data: Object.values(reportData.categoryBreakdown),
        backgroundColor: [
          '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40',
        ],
      },
    ],
  };

  // Data for Bar Chart
  const barData = {
    labels: ['Income', 'Expenses', 'Investments'],
    datasets: [
      {
        label: 'Amount (₹)',
        data: [reportData.income, reportData.expenses, reportData.investments],
        backgroundColor: ['#4CAF50', '#F44336', '#2196F3'],
      },
    ],
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Financial Reports</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Income, Expenses, Investments Summary */}
        <div className="bg-white p-6 shadow-lg rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Summary</h2>
          <p>💰 Income: ₹{reportData.income}</p>
          <p>📉 Expenses: ₹{reportData.expenses}</p>
          <p>📈 Investments: ₹{reportData.investments}</p>
        </div>

        {/* Pie Chart - Expense Breakdown */}
        <div className="bg-white p-6 shadow-lg rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Expense Breakdown</h2>
          <Pie data={pieData} />
        </div>

        {/* Bar Chart - Income vs Expenses vs Investments */}
        <div className="col-span-2 bg-white p-6 shadow-lg rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Financial Overview</h2>
          <Bar data={barData} />
        </div>
      </div>
    </div>
  );
};

export default Reports;
