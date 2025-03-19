import React, { useEffect, useState, useContext } from 'react';
import { getTransactions, deleteTransaction } from '../api/transaction.js';
import { AuthContext } from '../context/auth.context.jsx';

const Transactions = () => {
    const { user } = useContext(AuthContext);
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const data = await getTransactions(user.token);
                setTransactions(data);
            } catch (error) {
                console.error('Error fetching transactions:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchTransactions();
    }, [user.token]);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this transaction?')) {
            try {
                await deleteTransaction(id, user.token);
                alert('Transaction deleted successfully');
                setTransactions((prev) => prev.filter((t) => t._id !== id));
            } catch (error) {
                console.error('Error deleting transaction:', error);
            }
        }
    };

    if (loading) return <p>Loading transactions...</p>;

    return (
        <div>
            <h1 className="text-3xl font-bold mb-4">Transaction Management</h1>
            <table className="w-full bg-white shadow-md rounded-lg">
                <thead>
                    <tr>
                        <th className="p-4">User</th>
                        <th className="p-4">Amount</th>
                        <th className="p-4">Type</th>
                        <th className="p-4">Date</th>
                        <th className="p-4">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((t) => (
                        <tr key={t._id} className="border-b">
                            <td className="p-4">{t.user?.name || 'Unknown'}</td>
                            <td className="p-4">₹{t.amount}</td>
                            <td className="p-4">{t.type}</td>
                            <td className="p-4">{new Date(t.date).toLocaleDateString()}</td>
                            <td className="p-4">
                                <button
                                    onClick={() => handleDelete(t._id)}
                                    className="bg-red-500 text-white px-4 py-2 rounded-lg"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Transactions;
