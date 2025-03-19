import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Dashboard from './pages/Dashboard.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import ManageUsers from './pages/ManageUsers.jsx';
import Transactions from './pages/Transactions.jsx';
import Reports from './pages/Reports';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={
          <ProtectedRoute allowedRoles={['Admin', 'Family Member', 'Accountant']} >
            <Dashboard />
          </ProtectedRoute>
        } />

        <Route
          path="/manage-users"
          element={
            <ProtectedRoute allowedRoles={['Admin']}>
              <ManageUsers />
            </ProtectedRoute>
          }
        />

        <Route
          path="/transactions"
          element={
            <ProtectedRoute allowedRoles={['Admin']}>
              <Transactions />
            </ProtectedRoute>
          }
        />

        <Route
          path="/reports"
          element={
            <ProtectedRoute allowedRoles={['Admin', 'Family Member']}>
              <Reports />
            </ProtectedRoute>
          }
        />

      </Routes>
    </Router>
  );
}

export default App;
