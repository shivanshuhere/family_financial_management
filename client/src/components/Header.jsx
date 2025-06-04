import React, { useContext } from 'react';
import { AuthContext } from '../context/auth.context.jsx';
import { Link, useNavigate } from 'react-router-dom';

const Header = ({ role }) => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = React.useState(false);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (


        <nav className="z-50 bg-blue-600 shadow sticky -top-2">
            <div className="container px-6 py-4 mx-auto">
                <div className="lg:flex lg:items-center lg:justify-between">
                    <div className="flex items-center justify-between">
                        <Link to="/dashboard" className="flex items-center">
                            <img className="w-auto h-6 sm:h-7" src="https://as2.ftcdn.net/v2/jpg/06/72/14/31/1000_F_672143151_v95dJEyGvKVWoXijU6LvxWtOch03cUat.webp" alt="" />  Finance Bull
                        </Link>

                        <div className="flex lg:hidden">
                            <button onClick={() => setIsOpen(!isOpen)} type="button" className="text-white dark:text-white hover:text-white dark:hover:text-white focus:outline-none focus:text-white dark:focus:text-white lg:hidden" aria-label="toggle menu"

                            >
                                {!isOpen ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>

                    <div className={`absolute inset-x-0 z-20 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-white dark:bg-blue-600 lg:mt-0 lg:p-0 lg:top-0 lg:relative lg:bg-transparent lg:w-auto lg:opacity-100 lg:translate-x-0 lg:flex lg:items-center ${isOpen ? 'translate-x-0 opacity-100' : 'opacity-0 -translate-x-full lg:translate-x-0 lg:opacity-100'}`}>
                        <div className="flex flex-col -mx-6 lg:flex-row lg:items-center lg:mx-8">
                            <Link to="/dashboard" className="px-3 py-2 mx-3 mt-2 text-white hover:text-slate-700 transition-colors duration-300 transform rounded-md lg:mt-0" >Dashboard</Link>
                            {role === 'Admin' && (<>
                                <Link to="/manage-users" className="px-3 py-2 mx-3 mt-2 text-white hover:text-slate-700 transition-colors duration-300 transform rounded-md lg:mt-0">Manage Users</Link>
                            </>)}
                            {(role === 'Family Member' || role === 'Accountant') && (<>
                                <Link to="/reports" className="px-3 py-2 mx-3 mt-2 text-white hover:text-slate-700 transition-colors duration-300 transform rounded-md lg:mt-0">Reports</Link>
                                <Link to="/transactions" className="px-3 py-2 mx-3 mt-2 text-white hover:text-slate-700 transition-colors duration-300 transform rounded-md lg:mt-0">Transactions</Link>
                                <Link to="/insights" className="px-3 py-2 mx-3 mt-2 text-white hover:text-slate-700 transition-colors duration-300 transform rounded-md lg:mt-0">Ai Insights</Link></>)}
                        </div>

                        <div className="flex items-center mt-4 lg:mt-0">
                            <button type="button" className="flex items-center focus:outline-none" aria-label="toggle profile dropdown">
                                <div className="w-8 h-8 overflow-hidden border-2 border-blue-400 rounded-full">
                                    <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80" className="object-cover w-full h-full" alt="avatar" />
                                </div>

                                <h3 className="mx-2 text-blue-700 dark:text-blue-200 lg:hidden">{user?.name || 'Guest'}</h3>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Header;
