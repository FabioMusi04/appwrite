import React, { useState, useEffect } from 'react';
import { Cart } from '../utils/types';
import { GetCart } from '../utils/appwriteconfig';
import Checkout from '../components/checkout';
import Alert from '../components/alert';

const CartPage: React.FC = () => {
    const [cartItems, setCartItems] = useState<Cart>(); 
    const [alert, setAlert] = useState<{ message: string; type: 'info' | 'success' | 'warning' | 'error'; handleClose: () => void }>({ message: '', type: 'info', handleClose: () => { } });

    const [isCheckingOut, setIsCheckingOut] = useState(false);

    useEffect(() => {
        const fetchCartItems = async () => {
            const cart = await GetCart();
            if (cart) {
                setCartItems(cart as Cart);
            }
        };
        fetchCartItems();
    }, []);

    const shippingCost = 5;

    const handleQuantityChange = (id: string, quantity: number) => {
        setCartItems((prevItems) => {
            if (!prevItems) return prevItems;
            const updatedItems = prevItems.items
                .map((item) =>
                    item.product.$id === id ? { ...item, quantity: quantity } : item
                )
                .filter((item) => item.quantity > 0);
            return { ...prevItems, items: updatedItems };
        });
        if (quantity === 0) {
            setAlert({ message: 'Product removed from cart', type: 'warning', handleClose: () => setAlert({ message: '', type: 'info', handleClose: () => { } }) });
        }
    };

    const totalCost = cartItems?.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    ) || 0;

    return (
        <div className="grow p-4 dark:bg-gray-900 dark:text-white">
              {
                alert.message != "" && (
                    <Alert message={alert.message} type={alert.type} onClose={alert.handleClose} />
                )
            }
            {isCheckingOut ? <Checkout /> : (
                <>
                    <h1 className="text-2xl font-bold mb-6 text-center">Shopping Cart</h1>
                    <div className="bg-white shadow-md rounded-lg p-6 dark:bg-gray-800">
                        {cartItems?.items.length === 0 ? (
                            <p className="text-center text-gray-500 dark:text-gray-400">Your cart is empty.</p>
                        ) : (
                            <div className="space-y-6">
                                {cartItems?.items.map((item) => (
                                    <div
                                        key={item.product.$id}
                                        className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700"
                                    >
                                        <div className="flex items-center">
                                            <img
                                                src={item.product.imageUrl}
                                                alt={item.product.name}
                                                className="w-16 h-16 object-cover mr-4 rounded shadow-sm"
                                            />
                                            <div>
                                                <h2 className="text-lg font-semibold">{item.product.name}</h2>
                                                <p className="text-gray-500 dark:text-gray-400">${item.price.toFixed(2)}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-center w-1/3">
                                            <select
                                                value={item.quantity}
                                                onChange={(e) =>
                                                    handleQuantityChange(item.product.$id, parseInt(e.target.value))
                                                }
                                                className="w-16 p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                                            >
                                                <option value="0">0</option>

                                                {Array.from({ length: item.product.stock }, (_, i) => i + 1).map((quantity) => (
                                                    <React.Fragment key={quantity}>
                                                        <option value={quantity}>
                                                            {quantity}
                                                        </option>
                                                    </React.Fragment>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="text-right w-24 font-semibold text-gray-700 dark:text-gray-300">
                                            <p>${(item.price * item.quantity).toFixed(2)}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {cartItems && cartItems.items.length > 0 && (
                            <div className="mt-6 text-right">
                                <div className="flex justify-end items-center space-x-4 py-2">
                                    <p className="font-semibold">Subtotal:</p>
                                    <p className="text-gray-800 dark:text-gray-200">${totalCost.toFixed(2)}</p>
                                </div>
                                <div className="flex justify-end items-center space-x-4 py-2">
                                    <p className="font-semibold">Shipping Cost:</p>
                                    <p className="text-gray-800 dark:text-gray-200">${shippingCost.toFixed(2)}</p>
                                </div>
                                <div className="flex justify-end items-center space-x-4 py-2 border-t border-gray-200 dark:border-gray-700 mt-4 pt-4">
                                    <p className="text-lg font-bold">Total:</p>
                                    <p className="text-lg font-bold text-blue-600 dark:text-blue-400">${(totalCost + shippingCost).toFixed(2)}</p>
                                </div>
                                <button className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out" onClick={() => setIsCheckingOut(true)}>
                                    Checkout
                                </button>
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default CartPage;
