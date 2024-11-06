import React, { useState, useEffect } from 'react';
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";

const ToggleTheme: React.FC = () => {
    const [theme, setTheme] = useState<'light' | 'dark'>('dark');

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme]);

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    return (
        <button
            onClick={toggleTheme}
            className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
        >
            {theme === 'light' ? (
                <MdOutlineLightMode className="h-6 w-6" />
            ) : (
                <MdOutlineDarkMode className="h-6 w-6" />
            )}
        </button>
    );
};

export default ToggleTheme;