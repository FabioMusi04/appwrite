import React, { useEffect } from 'react';
import { Order } from '../utils/types';

interface OrderInfoModalProps {
    isOpen: boolean;
    onClose: () => void;
    order: Order | null;
}

const OrderInfoModal: React.FC<OrderInfoModalProps> = ({ isOpen, onClose, order }) => {
    useEffect(() => {
        if (isOpen) {
            document.body.classList.add('no-scroll');
        } else {
            document.body.classList.remove('no-scroll');
        }
        return () => {
            document.body.classList.remove('no-scroll');
        };
    }, [isOpen]);

    if (!isOpen || !order) return null;

    return (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-gray-500 bg-opacity-75 dark:bg-gray-900 dark:bg-opacity-75">
            <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
            <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-lg w-full mx-auto overflow-hidden">
                <div className="px-4 py-5 sm:p-6 overflow-y-auto max-h-[80vh]">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">Order Information</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-300">User: {order.user}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-300">Status: {order.status}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-300">Price: ${order.price}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-300">Created At: {new Date(order.$createdAt).toLocaleString()}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-300">Updated At: {new Date(order.$updatedAt).toLocaleString()}</p>
                    {order.products.map((product) => (
                        <>
                            <div key={product.$id} className="mt-4 flex items-center">
                                <img src={product.imageUrl} alt={product.name} className="w-24 h-24 rounded mr-4" />
                                <div>
                                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{product.name}</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-300">Price: ${product.price}</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-300">Stock: {product.stock}</p>
                                </div>
                            </div>
                            <hr className="my-4 border-gray-200 dark:border-gray-700" />
                        </>
                    ))}
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <button
                        type="button"
                        className="w-full sm:w-auto inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        onClick={onClose}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OrderInfoModal;
