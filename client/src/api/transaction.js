import axios from "axios";

const API_URL = "http://localhost:5000/api/transactions";

export const getTransactions = async (token) => {
    const response = await axios.get(API_URL, {
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
