import React, { useEffect, useState, useContext } from 'react';
import { getUsers, updateUserRole, deleteUser } from '../api/user.js';
import { AuthContext } from '../context/auth.context.jsx';

const ManageUsers = () => {
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers(user?.token);
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [user?.token]);

  const handleRoleChange = async (id, newRole) => {
    try {
      await updateUserRole(id, newRole, user.token);
      alert('User role updated');
      setUsers((prevUsers) =>
        prevUsers.map((u) => (u._id === id ? { ...u, role: newRole } : u))
      );
    } catch (error) {
      console.error('Error updating user role:', error);
    }
  };

  const handleDeleteUser = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteUser(id, user.token);
        alert('User deleted');
        setUsers((prevUsers) => prevUsers.filter((u) => u._id !== id));
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  if (loading) return <p>Loading users...</p>;

  return (
    <div>
      <h1 className="text-3xl mb-4">Manage Users</h1>
      <table className="w-full bg-white shadow-md rounded-lg">
        <thead>
          <tr>
            <th className="p-4">Name</th>
            <th className="p-4">Email</th>
            <th className="p-4">Role</th>
            <th className="p-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id} className="border-b">
              <td className="p-4">{u.name}</td>
              <td className="p-4">{u.email}</td>
              <td className="p-4">
                <select
                  value={u.role}
                  onChange={(e) => handleRoleChange(u._id, e.target.value)}
                  className="border p-2 rounded"
                >
                  <option value="Admin">Admin</option>
                  <option value="Family Member">Family Member</option>
                  <option value="Accountant">Accountant</option>
                </select>
              </td>
              <td className="p-4">
                <button
                  onClick={() => handleDeleteUser(u._id)}
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

export default ManageUsers;
