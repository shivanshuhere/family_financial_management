import React, { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom"
import { AuthContext } from '../context/auth.context.jsx';
import { Link } from 'react-router-dom';
import Loading from "../components/Loading.jsx"
import axios from 'axios';

const Login = () => {
    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false)
    const [msg, setMsg] = useState('')
    const navigator = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/auth/login`, { email, password });
            login(response.data); // Store user data using context
            // alert('Login Successful');
            setMsg('Login Successful !')
            navigator('/dashboard');

        } catch (error) {
            console.error('Login Failed:', error.response?.data?.message || error.message);
            // alert('Login Failed');
            setMsg(error.response?.data?.message || error?.message || "Login Failed !")
        }
        finally {
            setLoading(false)
        }
    };

    return (<>
        {
            loading ? (<Loading />) : <div className="max-w-md mx-auto mt-10">
                <h1 className="text-2xl font-bold mb-6">Login</h1>
                <h2 className="text-sm text-red-500">{msg}</h2>
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
                    <div> New user ?
                        <Link to={'/register'} className='underline text-blue-600'> Create an account</Link>
                    </div>
                </form>

            </div >

        }
    </>
    )
};

export default Login;
