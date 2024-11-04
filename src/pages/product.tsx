import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { GetProduct, UpdateCart } from '../utils/appwriteconfig';
import { Product } from '../utils/types';
import { FaShoppingCart } from 'react-icons/fa';
import Spinner from '../components/loading';
import Alert from '../components/alert';

const ProductDetailPage: React.FC = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [quantity, setQuantity] = useState(1);
    const [alert, setAlert] = useState<{ message: string; type: 'info' | 'success' | 'warning' | 'error'; handleClose: () => void }>({ message: '', type: 'info', handleClose: () => { } });

    const fetchProduct = async (id: string) => {
        setLoading(true);
        try {
            const response = await GetProduct(id);
            const productFetch = response as Product;
            setProduct(productFetch);
        } catch (error) {
            console.error('Error fetching product:', error);
            setError('Failed to load product details.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (productId) {
            fetchProduct(productId);
        }
    }, [productId]);

    const handleAddToCart = async () => {
        try {
            const price = product?.isDiscounted ? product?.price - ((product?.discount / 100) * product?.price) : product?.price || 0;
            await UpdateCart(product?.$id, quantity, Math.round(price));
            setAlert({ message: 'Product added to cart', type: 'success', handleClose: () => setAlert({ message: '', type: 'info', handleClose: () => { } }) });
        }
        catch (error) {
            console.error('Error adding product to cart:', error);
            setAlert({ message: 'Failed to add product to cart', type: 'error', handleClose: () => setAlert({ message: '', type: 'info', handleClose: () => { } }) });
        }


    };

    if (loading) return <Spinner />;
    if (error) return <div className="text-center text-red-500 mt-6 dark:text-red-400">{error}</div>;

    return (
        <div className="flex justify-center items-center grow dark:bg-gray-900 dark:text-white">
            {
                alert.message != "" && (
                    <Alert message={alert.message} type={alert.type} onClose={alert.handleClose} />
                )
            }
            <div className="grow px-4 py-6 dark:bg-gray-900 dark:text-white max-w-4xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <img
                            src={product?.imageUrl}
                            alt={product?.name}
                            className="object-cover rounded-lg shadow-lg dark:shadow-gray-800"
                        />
                    </div>

                    <div className="space-y-4">
                        <h1 className="text-3xl font-bold dark:text-white">{product?.name}</h1>
                        <p className="text-gray-600 dark:text-gray-400">${product?.price.toFixed(2)}</p>
                        <p className="text-gray-700 dark:text-gray-300">{product?.description}</p>

                        <div className="flex items-center space-x-4">
                            <label htmlFor="quantity" className="font-medium dark:text-gray-300">Quantity:</label>
                            <select
                                id="quantity"
                                value={quantity}
                                onChange={(e) => setQuantity(Number(e.target.value))}
                                className="border border-gray-300 rounded-lg p-2 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                            >
                                {Array.from({ length: product?.stock || 0 }, (_, i) => i + 1).map((num) => (
                                    <option key={num} value={num}>{num}</option>
                                ))}
                            </select>
                        </div>

                        <button
                            onClick={handleAddToCart}
                            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center space-x-2 dark:bg-blue-500 dark:hover:bg-blue-600"
                        >
                            <FaShoppingCart />
                            <span>Add to Cart</span>
                        </button>
                    </div>

                    <div className="col-span-2">
                        <h2 className="text-2xl font-bold dark:text-white mb-4">Comments:</h2>
                        <div className="space-y-6">
                            <div className="flex items-start space-x-4">
                                <img
                                    src="https://placehold.co/400"
                                    alt="User"
                                    className="w-10 h-10 rounded-full"
                                />
                                <div className="flex-1 space-y-2">
                                    <div className="flex items-center space-x-2">
                                        <span className="font-medium dark:text-white">John Doe</span>
                                        <div className="flex items-center space-x-1 text-yellow-500">
                                            <span>★</span>
                                            <span>★</span>
                                            <span>★</span>
                                            <span className="text-gray-500">★</span>
                                            <span className="text-gray-500">★</span>
                                        </div>
                                        <span className="text-gray-500 text-sm">2 days ago</span>
                                    </div>
                                    <p className="text-gray-700 dark:text-gray-300 text-sm max-w-full leading-relaxed">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ProductDetailPage;
