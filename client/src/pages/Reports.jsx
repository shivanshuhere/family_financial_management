import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register chart components
ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Reports = () => {
  const { user } = useContext(AuthContext);
  const [reportData, setReportData] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [category, setCategory] = useState('');

  // Fetch Report Data with Filters
  const fetchReport = async () => {
    try {
      const params = {};
      if (startDate) params.startDate = startDate;
      if (endDate) params.endDate = endDate;
      if (category) params.category = category;

      const response = await axios.get('http://localhost:5000/api/reports', {
        headers: { Authorization: `Bearer ${user.token}` },
        params,
      });
      setReportData(response.data);
    } catch (error) {
      console.error('Error fetching financial report:', error);
    }
  };

  useEffect(() => {
    fetchReport();
  }, [startDate, endDate, category]);

  if (!reportData) return <p>Loading Report...</p>;

  // Data for Pie Chart
  const pieData = {
    labels: Object.keys(reportData.categoryBreakdown),
    datasets: [
      {
        data: Object.values(reportData.categoryBreakdown),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
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

      {/* Filters */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label>Start Date:</label>
          <input type="date" className="border p-2 w-full" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        </div>

        <div>
          <label>End Date:</label>
          <input type="date" className="border p-2 w-full" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        </div>

        <div>
          <label>Category:</label>
          <select className="border p-2 w-full" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">All Categories</option>
            <option value="Income">Income</option>
            <option value="Expense">Expense</option>
            <option value="Investment">Investment</option>
          </select>
        </div>
      </div>

      {/* Summary Report */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
