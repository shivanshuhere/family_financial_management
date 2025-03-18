import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/');
        }
        return () => {
            console.log('Dashboard unmounted');
        };
    }, [user, navigate]);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className="h-screen flex flex-col justify-center items-center bg-gray-50">
            <h1 className="text-4xl mb-4">Welcome, {user?.name || 'User'}!</h1>
            <h2 className="text-2xl mb-8">Role: {user?.role || 'Unknown'}</h2>

            {user?.role === 'Admin' && <p className="text-green-500">You have Admin access to manage users and finances.</p>}
            {user?.role === 'Family Member' && <p className="text-blue-500">You can view family finances and reports.</p>}
            {user?.role === 'Accountant' && <p className="text-yellow-500">You are responsible for reviewing transactions.</p>}

            <button onClick={handleLogout} className="bg-red-500 text-white py-2 px-4 rounded-lg mt-4">Logout</button>
        </div>
    );
};

export default Dashboard;
