import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/auth.context.jsx';
import axios from 'axios';
import Loading from '../components/Loading.jsx';

const Insights = () => {
    const { user } = useContext(AuthContext);
    const [insights, setInsights] = useState("");
    const [msg, setMsg] = useState('');

    const fetchInsights = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/insights/generate`, {
                headers: { Authorization: `Bearer ${user.token}` },
            });
            setMsg(response?.data?.message)
            setInsights(response.data.insights);
        } catch (error) {
            setMsg((error?.response?.data?.message)?.split(".")[0] || error?.message || "Error fetching insights")

        }
    };

    useEffect(() => {
        fetchInsights();
    }, []);

    return (
        <div className="container mx-auto p-8">
            <h1 className="text-3xl font-bold mb-6">AI-Powered Financial Insights</h1>
            <div className="border p-4 rounded-lg bg-gray-50">
                {insights && <p>{insights}</p>}
                {msg ? <p>{msg}</p> : <Loading />}
            </div>
        </div>
    );
};

export default Insights;
