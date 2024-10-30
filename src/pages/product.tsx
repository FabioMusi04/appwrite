import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { GetProduct } from '../utils/appwriteConfig';
import { Product } from '../utils/types';

const ProductDetailPage: React.FC = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

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

    if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
    if (error) return <div className="text-center text-red-500 mt-6">{error}</div>;

    return (
        <div className="max-w-6xl mx-auto px-4 py-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <img 
                        src={product?.imageUrl} 
                        alt={product?.name} 
                        className="w-full h-full object-cover rounded-lg shadow-lg"
                    />
                </div>
                
                <div className="space-y-4">
                    <h1 className="text-3xl font-bold">{product?.name}</h1>
                    <p className="text-gray-600">${product?.price.toFixed(2)}</p>
                    <p className="text-gray-700">{product?.description}</p>
                    

                    <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailPage;
