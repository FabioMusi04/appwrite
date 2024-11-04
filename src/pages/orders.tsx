import React, { useEffect } from 'react';
import { Order } from '../utils/types';
import { GetOrders } from '../utils/appwriteconfig';
import Spinner from '../components/loading';
import OrderInfoModal from '../components/orderinfomodal';

const OrdersPage: React.FC = () => {
    const [orders, setOrders] = React.useState<Order[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [orderInfoModalOpen, setOrderInfoModalOpen] = React.useState(false);
    const [selectedOrder, setSelectedOrder] = React.useState<Order | null>(null);
    const [groupedOrders, setGroupedOrders] = React.useState<{ [key: string]: Order[] }>({});

    const groupOrdersByMonth = (orders: Order[]) => {
        return orders.reduce((acc, order) => {
            const date = new Date(order.$createdAt);
            const month = date.toLocaleString('default', { month: 'long' });
            const year = date.getFullYear();
            const key = `${month} ${year}`;

            if (!acc[key]) {
                acc[key] = [];
            }

            acc[key].push(order);
            return acc;
        }, {} as { [key: string]: Order[] });
    };

    useEffect(() => {
        const fetchOrders = async () => {
            const response = await GetOrders() as Order[];
            setOrders(response);
            setLoading(false);
        };

        fetchOrders();
    }, []);

    useEffect(() => {
        setGroupedOrders(groupOrdersByMonth(orders));
    }, [orders]);

    useEffect(() => {
        if (selectedOrder) {
            setOrderInfoModalOpen(true);
        }
    }, [selectedOrder]);

    return (
        <div className="bg-gray-100 dark:bg-gray-900 dark:text-white min-h-screen py-10">
            <OrderInfoModal isOpen={orderInfoModalOpen} onClose={() => {
                setOrderInfoModalOpen(false);
                setSelectedOrder(null);
            }} order={selectedOrder} />
            <div className="container mx-auto p-4">
                <h1 className="text-3xl font-extrabold mb-6 text-gray-800 dark:text-white">Your Orders</h1>
                {Object.keys(groupedOrders).length === 0 && !loading && (
                    <p className="text-center text-gray-500">No orders found.</p>
                )}
                {loading && (
                    <Spinner />
                )}
                {Object.keys(groupedOrders).map((month) => (
                    <div key={month} className="mb-10">
                        <h2 className="text-2xl font-semibold mb-4 text-gray-700 dark:text-gray-300">{month}</h2>
                        <div className="space-y-4">
                            {groupedOrders[month].map((order: Order) => (
                                <div key={order.$id} className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                                    <div className="flex justify-between items-center mb-2">
                                        <div>
                                            <p className="text-lg font-medium text-gray-900 dark:text-gray-100">Order ID: {order.$id}</p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">Placed on: {new Date(order.$createdAt).toLocaleDateString()}</p>
                                        </div>
                                        <div>
                                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${order.status === 'Shipped' ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'}`}>
                                                {order.status}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">Total Price:</p>
                                            <p className="text-xl font-bold text-gray-800 dark:text-gray-100">${order.price.toFixed(2)}</p>
                                        </div>
                                        <button className="bg-yellow-500 text-white font-semibold py-2 px-4 rounded hover:bg-yellow-600 transition" onClick={() => setSelectedOrder(order)}>
                                            View Order Details
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OrdersPage;
