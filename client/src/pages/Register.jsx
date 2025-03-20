import React, { useState } from 'react';
import { registerUser } from '../api/auth.js';
import InputField from '../components/InputField';
import Button from '../components/Button';
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
            <div className="h-screen flex justify-center items-center bg-gray-100">
                <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold mb-6">Register</h2>
                    {msg && <p className="text-red-500 mb-4">{msg}</p>}
                    <InputField
                        label="Name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                    <InputField
                        label="Email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <InputField
                        label="Password"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    <Button text="Register" onClick={handleRegister} />
                    <div> Already have an account ?
                        <Link to={'/'} className='underline text-blue-600'> Login </Link>
                    </div>
                </div>
            </div>
    );
};

export default Register;
