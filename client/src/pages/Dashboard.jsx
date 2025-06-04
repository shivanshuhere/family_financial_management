import React from 'react';
import Layout from '../components/Layout';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    return (
        <Layout>
            <div className="container mx-auto px-4 py-12 md:py-20">
                <div className="flex flex-col md:flex-row items-center">
                    <div className="md:w-1/2 md:pr-8">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                            Online Financial Management Software
                        </h1>
                        <p className="text-lg text-gray-600 mb-8">
                            Web-based financial management tool geared towards small and medium businesses to manage finances and stay on top of cash flow.
                        </p>
                        <div>
                            <Link
                                to="/transactions"
                                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg inline-block transition-colors shadow-md"
                            >
                                Get started for free
                            </Link>
                        </div>
                    </div>
                    <div className="md:w-1/2 mt-8 md:mt-0 hidden md:block ">
                        <div className="relative h-64 md:h-96 w-full">
                            <img
                                src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2022&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                alt="Flowlu - Online Financial Management Software"
                                className="object-contain w-full h-full"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="container mx-auto px-4 py-16 bg-gray-50">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Feature 1 */}
                    <div className="flex items-start">
                        <div className="flex-shrink-0 mr-4">
                            <div className="bg-blue-100 p-3 rounded-full h-12 w-12 flex items-center justify-center">
                                <img
                                    src="https://www.flowlu.com/site/assets/files/12926/figur1-1.svg"
                                    alt="Secure"
                                    className="w-6 h-6"
                                />
                            </div>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Secure</h3>
                            <p className="text-gray-600">
                                All your information is stored and encrypted using the TLS protocol.
                            </p>
                        </div>
                    </div>

                    {/* Feature 2 */}
                    <div className="flex items-start">
                        <div className="flex-shrink-0 mr-4">
                            <div className="bg-green-100 p-3 rounded-full h-12 w-12 flex items-center justify-center">
                                <img
                                    src="https://www.flowlu.com/site/assets/files/12927/figur2.svg"
                                    alt="Easy-to-use"
                                    className="w-6 h-6"
                                />
                            </div>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Easy-to-use</h3>
                            <p className="text-gray-600">
                                Explore the seamless onboarding and knowledge base.
                            </p>
                        </div>
                    </div>

                    {/* Feature 3 */}
                    <div className="flex items-start">
                        <div className="flex-shrink-0 mr-4">
                            <div className="bg-purple-100 p-3 rounded-full h-12 w-12 flex items-center justify-center">
                                <img
                                    src="https://www.flowlu.com/site/assets/files/12926/figur1-1.svg"
                                    alt="All-in-one"
                                    className="w-6 h-6"
                                />
                            </div>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">All-in-one</h3>
                            <p className="text-gray-600">
                                Everything for planning, managing and analyzing your projects.
                            </p>
                        </div>
                    </div>

                    {/* Feature 4 */}
                    <div className="flex items-start">
                        <div className="flex-shrink-0 mr-4">
                            <div className="bg-yellow-100 p-3 rounded-full h-12 w-12 flex items-center justify-center">
                                <img
                                    src="	https://www.flowlu.com/site/assets/files/12927/figur2.svg"
                                    alt="Fully customizable"
                                    className="w-6 h-6"
                                />
                            </div>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Fully customizable</h3>
                            <p className="text-gray-600">
                                Customize Flowlu to meet the needs of your business and clients.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Dashboard;
