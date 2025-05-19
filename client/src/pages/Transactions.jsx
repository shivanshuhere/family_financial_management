import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/auth.context.jsx';
import axios from 'axios';

const Transactions = () => {
    const { user } = useContext(AuthContext);
    const [transactions, setTransactions] = useState([]);
    const [formData, setFormData] = useState({
        type: 'Income',
        category: '',
        amount: '',
        description: '',
        date: '',
    });
    const [alert, setAlert] = useState(false);
    const [alertType, setAlertType] = useState("");
    const categoryArr = ["Salary",
        "Groceries",
        "Utilities",
        "Education",
        "Healthcare",
        "Entertainment",
        "Travel",
        "Investment",
        "Other",
    ]
    // Fetch Transactions
    const fetchTransactions = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/transactions`, {
                headers: { Authorization: `Bearer ${user?.token}` },
            });
            setTransactions(response?.data);
        } catch (error) {
            console.error('Error fetching transactions:', error);
        }
    };

    // Handle Form Input
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Add Transaction
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("formData : ", formData);
        try {
            await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/transactions`, formData, {
                headers: { Authorization: `Bearer ${user.token}` },
            });
            // alert('Transaction Added!');
            setAlert(true);
            setAlertType("added !");
            fetchTransactions(); // Refresh transactions
        } catch (error) {
            // console.error('Error adding transaction:', error);
            setAlert(true);
            setAlertType("error !");
        }
    };

    // Delete Transaction
    const handleDelete = async (id) => {
        try {
            await axios.delete(`${import.meta.env.VITE_SERVER_URL}/api/transactions/${id}`, {
                headers: { Authorization: `Bearer ${user.token}` },
            });
            // alert('Transaction Deleted!');
            setAlert(true);
            setAlertType("deleted !");
            fetchTransactions();
        } catch (error) {
            console.error('Error deleting transaction:', error);
            setAlert(true);
            setAlertType("error !");
        }
    };

    useEffect(() => {
        fetchTransactions();
    }, []);

    useEffect(() => {
        setTimeout(() => {
            setAlert(false);
            setAlertType("");
        }, 3000);
    }, [alert]);

    return (
        <div className="container mx-auto p-8">
            <div className='fixed flex justify-center items-center bottom-10 right-10 z-50'>
                {alert && alertType !== "error !" && (
                    <div role="alert" className="alert alert-success ">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>Transaction success!</span>
                    </div>
                )} {alert && alertType === "error !" && (
                    <div role="alert" className="alert alert-error">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>Error! Transaction Failed</span>
                    </div>
                )}
            </div>
            <h1 className="text-3xl font-bold mb-6">Manage Transactions</h1>

            {/* Add Transaction Form */}
            <form onSubmit={handleSubmit} className="mb-8 bg-white p-6 shadow-md rounded-lg">
                <h2 className="text-xl font-semibold mb-4">Add New Transaction</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <select name="type" value={formData.type} onChange={handleChange} className="p-2 border rounded">
                        <option value="Income">Income</option>
                        <option value="Expense">Expense</option>
                        <option value="Investment">Investment</option>
                    </select>

                    <select name="category" value={formData.category} onChange={handleChange} className="p-2 border rounded">
                        <option value={"Other"}>---- Select Category ----</option>
                        {categoryArr.map((category, index) => (
                            <option key={index} value={category}>{category}</option>
                        ))}

                    </select>

                    <input
                        type="number"
                        name="amount"
                        placeholder="Amount (₹)"
                        value={formData.amount}
                        onChange={handleChange}
                        className="p-2 border rounded"
                    />

                    <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        className="p-2 border rounded"
                    />

                    <input
                        type="text"
                        name="description"
                        placeholder="Description (optional)"
                        value={formData.description}
                        onChange={handleChange}
                        className="p-2 border rounded"
                    />
                </div>

                <button type="submit" className="bg-green-500 text-white mt-4 p-2 rounded">
                    Add Transaction
                </button>
            </form>

            {/* Transaction List */}
            <h2 className="text-xl font-semibold mb-4">Transaction History</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full border-collapse border border-gray-200">
                    <thead>
                        <tr>
                            <th className="border p-2">Date</th>
                            <th className="border p-2">Type</th>
                            <th className="border p-2">Category</th>
                            <th className="border p-2">Amount (₹)</th>
                            <th className="border p-2">Description</th>
                            <th className="border p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((txn) => (
                            <tr key={txn._id}>
                                <td className="border p-2">{new Date(txn.date).toLocaleDateString()}</td>
                                <td className={`border p-2 ${txn.type === 'Income' ? 'text-green-500' : 'text-red-500'}`}>
                                    {txn.type}
                                </td>
                                <td className="border p-2">{txn.category}</td>
                                <td className="border p-2">₹{txn.amount}</td>
                                <td className="border p-2">{txn.description || '-'}</td>
                                <td className="border p-2">
                                    <button
                                        onClick={() => handleDelete(txn._id)}
                                        className="bg-red-500 text-white px-4 py-1 rounded"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Transactions;
