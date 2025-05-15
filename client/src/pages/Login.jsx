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

    return (
        <>
            {
                loading ? (<Loading />) :

                    //         <div className="max-w-md mx-auto flex justify-center items-center h-screen flex-col ">
                    // //             <h1 className="text-2xl font-bold mb-6">Login</h1>
                    // //             <h2 className="text-sm text-red-500">{msg}</h2>
                    // //             <form onSubmit={handleLogin}>
                    // //                 <input
                    //                     type="email"
                    //                     placeholder="Email"
                    //                     className="w-full p-2 mb-4 border"
                    //                     value={email}
                    //                     onChange={(e) => setEmail(e.target.value)}
                    //                 />
                    //                 <input
                    //                     type="password"
                    //                     placeholder="Password"
                    //                     className="w-full p-2 mb-4 border"
                    //                     value={password}
                    //                     onChange={(e) => setPassword(e.target.value)}
                    //                 />
                    //                 <button className="bg-blue-500 text-white p-2 w-full" type="submit">Login</button>
                    //                 <div> New user ?
                    //                     <Link to={'/register'} className='underline text-blue-600'> Create an account</Link>
                    //                 </div>
                    //             </form>

                    //         </div >

                    <div className="max-w-md mx-auto flex justify-center items-center h-screen flex-col ">
                        < div className="w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800" >
                            <div className="px-6 py-4">
                                <div className="flex justify-center mx-auto">
                                    <img className="w-auto h-7 sm:h-8" src="https://merakiui.com/images/logo.svg" alt="" />
                                </div>

                                <h3 className="mt-3 text-xl font-medium text-center text-gray-600 dark:text-gray-200">Welcome Back</h3>

                                <p className="mt-1 text-center text-gray-500 dark:text-gray-400">Login or create account</p>

                                <form>
                                    <div className="w-full mt-4">
                                        <input
                                            className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                                            type="email"
                                            placeholder="Email Address"
                                            aria-label="Email Address"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>

                                    <div className="w-full mt-4">
                                        <input
                                            className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" type="password"
                                            placeholder="Password"
                                            aria-label="Password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </div>

                                    <div className="flex items-center justify-center mt-4">

                                        <button className="px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                                            type="submit"
                                            onClick={handleLogin}
                                        >
                                            Sign In
                                        </button>
                                    </div>
                                </form>
                            </div>

                            <div className="flex items-center justify-center py-4 text-center bg-gray-50 dark:bg-gray-700">
                                <span className="text-sm text-gray-600 dark:text-gray-200">Don't have an account? </span>

                                <Link to={'/register'} className="mx-2 text-sm font-bold text-blue-500 dark:text-blue-400 hover:underline">Register</Link>
                            </div>
                        </div>
                    </div>
            }
        </>

    )
};

export default Login;
