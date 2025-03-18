import React from 'react';
import Layout from '../components/Layout';

const Dashboard = () => {
    return (
        <Layout>
            <h1 className="text-4xl font-bold mb-4">Dashboard Overview</h1>
            <p className="text-gray-700">Welcome to your financial management dashboard. Here you can manage and view your family finances.</p>
        </Layout>
    );
};

export default Dashboard;
