import React, { useContext } from 'react';
import Footer from './Footer.jsx';
import Header from './Header.jsx';
import { AuthContext } from '../context/auth.context.jsx';

const Layout = ({ children }) => {
    const { user } = useContext(AuthContext);

    return (
        <div className=" bg-gray-800">
            {/* <Sidebar role={user?.role} /> */}
            <div>
                <Header role={user?.role} />
                <div className="p-6 bg-gray-100 flex-1 overflow-y-auto">{children}</div>
                <Footer />
            </div>
        </div>
    );
};

export default Layout;
