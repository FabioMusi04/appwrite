import React from 'react';

const Unauthorized: React.FC = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
            <div className="text-center animate-fadeIn">
                <h1 className="text-6xl font-bold text-gray-800 dark:text-gray-200 animate-bounce">401</h1>
                <p className="text-2xl text-gray-600 dark:text-gray-400 mt-4">Unauthorized</p>
                <p className="text-gray-500 dark:text-gray-500 mt-2">Sorry, you are not authorized to access this page.</p>
                <a href="/" className="mt-6 inline-block px-4 py-2 bg-blue-500 dark:bg-blue-700 text-white rounded hover:bg-blue-600 dark:hover:bg-blue-800 transition duration-300 ease-in-out transform hover:scale-105">
                    Go to Home
                </a>
            </div>
        </div>
    );
};

export default Unauthorized;