import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { GetProducts } from '../utils/appwriteConfig';
import { ID } from '../utils/appwriteConfig';

const ProductsPage: React.FC = () => {
    const [products, setProducts] = useState<any[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    
    const { ref, inView } = useInView();

    const fetchProducts = async (page: number) => {
        setLoading(true);
        try {
            const response = await GetProducts(page, 12);
            const newProducts = response;
            setProducts((prev) => [...prev, ...newProducts]);
            setHasMore(newProducts.length > 0);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts(page);
    }, [page]);

    useEffect(() => {
        if (inView && hasMore && !loading) {
            setPage((prev) => prev + 1);
        }
    }, [inView, hasMore, loading]);

    return (
        <div className="max-w-7xl mx-auto px-4 py-6">
            <h1 className="text-2xl font-bold mb-4">Products</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {products.map((product) => (
                    <div key={ID.unique()} className="border p-4 rounded shadow">
                        <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover mb-2" />
                        <h2 className="text-lg font-semibold">{product.name}</h2>
                        <p className="text-gray-600">${product.price.toFixed(2)}</p>
                    </div>
                ))}
            </div>
            <div ref={ref} className="h-16 flex items-center justify-center">
                {loading ? <span>Loading...</span> : hasMore ? <span>Scroll down for more products...</span> : <span>No more products!</span>}
            </div>
        </div>
    );
};

export default ProductsPage;
