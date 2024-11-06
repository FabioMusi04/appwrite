import React from 'react';

const AboutPage: React.FC = () => {
    return (
        <div className='grow flex items-center justify-center bg-white dark:bg-gray-900 text-black dark:text-white'>
            <div className="p-8 max-w-lg text-center">
                <h1 className="text-4xl font-bold mb-4">About Us</h1>
                <p className="text-lg">
                    Welcome to our website. We are committed to providing the best service possible.
                </p>
            </div>
        </div>
    );
};

export default AboutPage;