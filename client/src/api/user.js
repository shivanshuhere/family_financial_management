import axios from "axios";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;
const API_URL = `${SERVER_URL}/api/users`;

export const getUsers = async (token) => {
    console.log("url : ", API_URL);

    const response = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response?.data;
};

export const updateUserRole = async (id, role, token) => {
    const response = await axios.put(
        `${API_URL}/${id}`,
        { role },
        {
            headers: { Authorization: `Bearer ${token}` },
        }
    );
    return response.data;
};

export const deleteUser = async (id, token) => {
    const response = await axios.delete(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};
