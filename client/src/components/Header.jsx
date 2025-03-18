import React, { useContext } from 'react';
import { AuthContext } from '../context/auth.context.jsx';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className="flex justify-between items-center bg-gray-700 p-4 text-white">
            <h2 className="text-xl">Welcome, {user?.name}!</h2>
            <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded">Logout</button>
        </div>
    );
};

export default Header;
