import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ role }) => {
    return (
        <div className="w-64 h-screen bg-gray-800 text-white p-6">
            <h1 className="text-3xl font-bold mb-6">Finance Dashboard</h1>
            <ul>
                <li className="mb-4">
                    <Link to="/dashboard" className="hover:text-blue-400">Overview</Link>
                </li>
                {role === 'Admin' && (
                    <>
                        <li className="mb-4">
                            <Link to="/manage-users" className="hover:text-blue-400">Manage Users</Link>
                        </li>

                    </>
                )}
                {(role === 'Family Member' || role === 'Accountant') && (
                    <>
                        <li className="mb-4">
                            <Link to="/reports" className="hover:text-blue-400">View Reports</Link>
                        </li>
                        <li className="mb-4">
                            <Link to="/transactions" className="hover:text-blue-400">Transactions</Link>
                        </li>
                    </>
                )}
            </ul>
        </div>
    );
};

export default Sidebar;
