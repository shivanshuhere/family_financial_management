import React, { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom"
import { AuthContext } from '../context/auth.context.jsx';
import axios from 'axios';

const Login = () => {
    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigator = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/auth/login`, { email, password });
            login(response.data); // Store user data using context
            alert('Login Successful');
            navigator('/dashboard');
        } catch (error) {
            console.error('Login Failed:', error.response?.data?.message || error.message);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10">
            <h1 className="text-2xl font-bold mb-6">Login</h1>
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Email"
                    className="w-full p-2 mb-4 border"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="w-full p-2 mb-4 border"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className="bg-blue-500 text-white p-2 w-full" type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
