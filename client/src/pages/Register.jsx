import React, { useState } from 'react';
import { registerUser } from '../api/auth.js';
import { useNavigate, Link } from 'react-router-dom';
import Loading from '../components/Loading.jsx';
const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [loading, setLoading] = useState(false)
    const [msg, setMsg] = useState('')
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });

    };

    const handleRegister = async () => {
        try {
            setLoading(true);
            const data = await registerUser(formData);
            setMsg(data?.response?.data?.message || "Registration Successful !")
            console.log(data);

            navigate('/');


        } catch (error) {
            setMsg(error?.response?.data?.message || error?.message || "Registration Failed !")
            console.error("error :: ", error)
        }
        finally {
            setLoading(false)
        }
    };

    return (
        loading ? <Loading /> :
            // <div className="h-screen flex justify-center items-center bg-gray-100">
            //     <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
            //         <h2 className="text-2xl font-bold mb-6">Register</h2>
            //         {msg && <p className="text-red-500 mb-4">{msg}</p>}
            //         <InputField
            //             label="Name"
            //             type="text"
            //             name="name"
            //             value={formData.name}
            //             onChange={handleChange}
            //         />
            //         <InputField
            //             label="Email"
            //             type="email"
            //             name="email"
            //             value={formData.email}
            //             onChange={handleChange}
            //         />
            //         <InputField
            //             label="Password"
            //             type="password"
            //             name="password"
            //             value={formData.password}
            //             onChange={handleChange}
            //         />
            //         <Button text="Register" onClick={handleRegister} />
            //         <div> Already have an account ?
            //             <Link to={'/'} className='underline text-blue-600'> Login </Link>
            //         </div>
            //     </div>
            // </div>
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
                                    type="text"
                                    placeholder="Name"
                                    aria-label="Name"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="w-full mt-4">
                                <input
                                    className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                                    type="email"
                                    placeholder="Email Address"
                                    aria-label="Email Address"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="w-full mt-4">
                                <input
                                    className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" type="password"
                                    placeholder="Password"
                                    aria-label="Password"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="flex items-center justify-center mt-4">

                                <button className="px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                                    type="submit"
                                    onClick={handleRegister}
                                >
                                    Register
                                </button>
                            </div>
                        </form>
                    </div>

                    <div className="flex items-center justify-center py-4 text-center bg-gray-50 dark:bg-gray-700">
                        <span className="text-sm text-gray-600 dark:text-gray-200">Already have an account? </span>

                        <Link to={'/'} className="mx-2 text-sm font-bold text-blue-500 dark:text-blue-400 hover:underline">Login</Link>
                    </div>
                </div>
            </div>
    );
};

export default Register;
