import axios from "axios";

const API_URL = `${import.meta.env.VITE_SERVER_URL}/api/transactions`;

export const getTransactions = async (token) => {
    const response = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

export const addTransaction = async (transaction, token) => {
    const response = await axios.post(API_URL, transaction, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

export const deleteTransaction = async (id, token) => {
    const response = await axios.delete(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};
