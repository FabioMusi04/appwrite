import React, { useState, useEffect } from 'react';
import { CreateOrderFromCart } from '../utils/appwriteconfig';
import { useNavigate } from 'react-router-dom';

const CheckoutLoading: React.FC = () => {
    const navigate = useNavigate();
    const [loadingStage, setLoadingStage] = useState(0);
    const loadingMessages = [
        { message: 'Processing Payment...', icon: '💳' },
        { message: 'Creating Order...', icon: '📦' },
        { message: 'Finalizing...', icon: '✅' },
    ];

    const processPayment = async () => {
        return new Promise<void>((resolve) => {
            setTimeout(() => {
                console.log("Payment processed.");
                resolve();
            }, 2000);
        });
    };

    const createOrder = async () => {
        return new Promise<void>((resolve) => {
            setTimeout(async () => {
                const order = await CreateOrderFromCart();
                if (!order) return;
                console.log("Order created.");
                resolve();
            }, 2000);
        });
    };

    const finalizeOrder = async () => {
        return new Promise<void>((resolve) => {
            setTimeout(() => {
                console.log("Order finalized.");
                resolve();
            }, 2000);
        });
    };

    useEffect(() => {
        const loadStages = async () => {
            for (let i = 0; i <= loadingMessages.length; i++) {
                setLoadingStage(i);
                
                if (i === 0) await processPayment();
                else if (i === 1) await createOrder();
                else if (i === 2) {
                    await finalizeOrder();
                    navigate('/myorders');
                }
            }
        };

        loadStages();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center grow space-y-6 text-center">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-80">
                {loadingStage < loadingMessages.length ? (
                    <div>
                        <div className="text-4xl mb-4">{loadingMessages[loadingStage].icon}</div>
                        <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
                            {loadingMessages[loadingStage].message}
                        </h2>
                        <div className="mt-6 w-full h-1 bg-gray-200 dark:bg-gray-700 rounded-full">
                            <div
                                className="h-1 bg-blue-600 rounded-full transition-all duration-500"
                                style={{ width: `${((loadingStage + 1) / loadingMessages.length) * 100}%` }}
                            ></div>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="text-green-600 text-4xl mb-4">🎉</div>
                        <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300">Order Complete!</h2>
                        <p className="mt-2 text-gray-500 dark:text-gray-400">Thank you for your purchase.</p>
                    </>
                )}
            </div>
        </div>
    );
};

export default CheckoutLoading;
