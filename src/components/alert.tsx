import React, { useEffect, useState } from 'react';
import { AiOutlineInfoCircle } from 'react-icons/ai';

interface AlertProps {
    message: string;
    type?: 'info' | 'success' | 'warning' | 'error';
    duration?: number;
    onClose: () => void;
}

const Alert: React.FC<AlertProps> = ({ message, type = 'info', duration = 3000, onClose }) => {
    const [isVisible, setIsVisible] = useState(true);
    const [progress, setProgress] = useState(95);
    
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
            onClose();
        }, duration);

        const interval = setInterval(() => {
            setProgress((prev) => prev - 1);
        }, 1);

        return () => {
            clearTimeout(timer);
            clearInterval(interval);
        };
    }, [duration, onClose]);        

    if (!isVisible) return null;

    const getColorClasses = () => {
        switch (type) {
            case 'success':
                return 'bg-green-500 text-white';
            case 'warning':
                return 'bg-yellow-500 text-black';
            case 'error':
                return 'bg-red-500 text-white';
            default:
                return 'bg-blue-500 text-white';
        }
    };

    return (
        <div className={`fixed top-0 right-0 m-4 p-4 rounded-lg shadow-lg flex items-center transition-all duration-300 ${getColorClasses()}`}>
            <AiOutlineInfoCircle className="text-2xl mr-2" />
            <div className="flex-1">{message}</div>
            <button 
                onClick={() => { setIsVisible(false); onClose(); }} 
                className="ml-2 text-white hover:text-gray-200"
            >
                &times;
            </button>
            <div 
                className="absolute bottom-0 left-2 h-1 bg-opacity-70 transition-all duration-300" 
                style={{ 
                    width: `${progress}%`,
                    backgroundColor: getColorClasses().includes('bg-blue') ? 'rgba(255, 255, 255, 0.3)' : getColorClasses().includes('bg-green') ? 'rgba(0, 100, 0, 1)' : getColorClasses().includes('bg-red') ? 'rgba(139, 0, 0, 1)' : 'rgba(255, 255, 0, 0.3)',
                    transition: `width ${duration}ms linear`,  // Animate the progress bar
                }} 
            />
        </div>
    );
};

export default Alert;
