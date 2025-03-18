import React, { useContext } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { AuthContext } from '../context/auth.context.jsx';

const Layout = ({ children }) => {
    const { user } = useContext(AuthContext);

    return (
        <div className="flex h-screen">
            <Sidebar role={user?.role} />
            <div className="flex-1 flex flex-col">
                <Header />
                <div className="p-6 bg-gray-100 flex-1 overflow-y-auto">{children}</div>
            </div>
        </div>
    );
};

export default Layout;
