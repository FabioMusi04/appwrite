import React, { useEffect, useState } from 'react';
import { Order, orderStatusEnum } from '../../utils/types'; // Assuming you have an Order type defined
import { GetOrders, UpdateOrder, DeleteOrder } from '../../utils/appwriteconfig'; 
import Alert from '../../components/alert';

const AdminOrdersPage: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [ordersPerPage] = useState(10);
    const [alert, setAlert] = useState<{ type?: 'info' | 'success' | 'warning' | 'error'; message: string; handleClose: () => void }>({ type: undefined, message: '', handleClose: () => setAlert({ type: undefined, message: '', handleClose: () => {} }) });

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await GetOrders(1, 100) as Order[]; // Fetching for pagination
            setOrders(response);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    const handleSaveOrderStatus = async (orderId: string, status: string) => {
        try {
            await UpdateOrder(orderId, { status });
            setAlert({ type: 'success', message: 'Order status updated successfully', handleClose: () => setAlert({ type: undefined, message: '', handleClose: () => {} }) });
            fetchOrders();
        } catch (error) {
            setAlert({ type: 'error', message: 'Error updating order status', handleClose: () => setAlert({ type: undefined, message: '', handleClose: () => {} }) });
            console.error('Error updating order status:', error);
        }
    };

    const handleDeleteOrder = async (orderId: string) => {
        try {
            await DeleteOrder(orderId);
            setAlert({ type: 'success', message: 'Order deleted successfully', handleClose: () => setAlert({ type: undefined, message: '', handleClose: () => {} }) });
            fetchOrders();
        } catch (error) {
            setAlert({ type: 'error', message: 'Error deleting order', handleClose: () => setAlert({ type: undefined, message: '', handleClose: () => {} }) });
            console.error('Error deleting order:', error);
        }
    };

    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);
    const totalPages = Math.ceil(orders.length / ordersPerPage);

    return (
        <div className="grow p-6 dark:bg-gray-900 dark:text-white">
            {
                alert.message != "" && (
                    <Alert type={alert.type} message={alert.message} onClose={alert.handleClose} />
                )
            }
            
            <h1 className="text-2xl font-bold mb-4">Admin Orders</h1>

            <table className="min-w-full bg-white dark:bg-gray-800">
                <thead>
                    <tr className="border-b dark:border-gray-700">
                        <th className="p-4 text-center">Order ID</th>
                        <th className="p-4 text-center">User</th>
                        <th className="p-4 text-center">Status</th>
                        <th className="p-4 text-center">Price</th>
                        <th className="p-4 text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentOrders.map((order) => (
                        <tr key={order.$id} className="border-b dark:border-gray-700 text-center">
                            <td className="p-4">{order.$id}</td>
                            <td className="p-4">{order.user}</td>
                            <td className="p-4">
                                <select
                                    value={order.status}
                                    onChange={(e) => handleSaveOrderStatus(order.$id, e.target.value)}
                                    className="p-2 bg-gray-200 dark:bg-gray-700 rounded"
                                >
                                    {Object.values(orderStatusEnum).map((status) => (
                                        <option key={status} value={status}>
                                            {status}
                                        </option>
                                    ))}
                                </select>
                            </td>
                            <td className="p-4">${order.price.toFixed(2)}</td>
                            <td className="p-4 flex justify-center space-x-2">
                                <button
                                    onClick={() => handleDeleteOrder(order.$id)}
                                    className="p-2 bg-red-500 text-white rounded hover:bg-red-600 dark:bg-red-700 dark:hover:bg-red-800"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="flex justify-between mt-4">
                <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800"
                >
                    Previous
                </button>
                <span>
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default AdminOrdersPage;
