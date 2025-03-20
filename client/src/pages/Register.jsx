import React, { useState } from 'react';
import { registerUser } from '../api/auth.js';
import InputField from '../components/InputField';
import Button from '../components/Button';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });

    };

    const handleRegister = async () => {
        try {
            const data = await registerUser(formData);
            console.log("registerd user :: ", JSON.stringify(data));
            navigate('/');
        } catch (error) {
            alert(error.response?.data?.message || 'Register failed');
        }
    };

    return (
        <div className="h-screen flex justify-center items-center bg-gray-100">
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-6">Register</h2>
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
                    <Link to={'/register'} className='underline text-blue-600'> Login </Link>
                </div>
            </div>
        </div>
    );
};

export default Register;
