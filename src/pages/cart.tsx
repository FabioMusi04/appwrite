import React, { useState, useEffect } from 'react';
import { Cart } from '../utils/types';
import { GetCart } from '../utils/appwriteConfig';

const CartPage: React.FC = () => {
    const [cartItems, setCartItems] = useState<Cart>();

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
    };

    const totalCost = cartItems?.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    ) || 0;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
            <div className="bg-white shadow-md rounded-lg p-4">
                {cartItems?.items.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    <div>
                        {cartItems?.items.map((item) => (
                            <div key={item.product.$id} className="flex justify-between items-center mb-4">
                                <div>
                                    <h2 className="text-lg font-semibold">{item.product.name}</h2>
                                    <p>${item.price.toFixed(2)}</p>
                                </div>
                                <div className="flex items-center">
                                    <input
                                        type="number"
                                        min="0"
                                        value={item.quantity}
                                        onChange={(e) =>
                                            handleQuantityChange(item.product.$id, parseInt(e.target.value))
                                        }
                                        className="w-16 p-2 border rounded"
                                    />
                                </div>
                            </div>
                        ))}
                        <div className="flex justify-between items-center mt-4">
                            <p>Shipping Cost:</p>
                            <p>${shippingCost.toFixed(2)}</p>
                        </div>
                        <div className="flex justify-between items-center mt-4">
                            <p>Total Cost:</p>
                            <p>${(totalCost + shippingCost).toFixed(2)}</p>
                        </div>
                        <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">
                            Checkout
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartPage;