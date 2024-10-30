import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { GetProducts, GetProductsWithSearch } from '../utils/appwriteConfig';
import { FiSearch } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { Product } from '../utils/types';

const ProductsPage: React.FC = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState<Product[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [search, setSearch] = useState('');

    const { ref, inView } = useInView();

    const fetchProducts = async (page: number) => {
        setLoading(true);
        try {
            const response = await GetProducts(page, 12);
            const newProducts = response as Product[];

            setProducts((prev) => [...prev, ...newProducts]);
            setHasMore(newProducts.length > 0);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchProductsWithSearch = async (page: number, search: string) => {
        setLoading(true);
        try {
            const response = await GetProductsWithSearch(page, 12, search);
            const newProducts = response as Product[];
            setProducts(newProducts);
            setHasMore(newProducts.length > 0);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchProducts(page);
    }, [page]);

    useEffect(() => {
        if (inView && hasMore && !loading) {
            setPage((prev) => prev + 1);
        }
    }, [inView, hasMore, loading]);

    return (
        <div className="grow px-4 py-6 dark:bg-gray-900 dark:text-white">
            <h1 className="text-2xl font-bold mb-4">Products</h1>
            <div className="mb-4 relative">
                <input
                    type="text"
                    className="w-full py-2 pl-10 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:focus:ring-blue-400"
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && fetchProductsWithSearch(1, search)}
                />
                <button className="absolute inset-y-0 right-0 flex items-center px-4 text-white bg-blue-500 rounded dark:bg-blue-700" onClick={() => fetchProductsWithSearch(1, search)}>
                    <FiSearch />
                </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {products.map((product : Product) => (
                    <div key={product.$id} className="border p-4 rounded shadow dark:bg-gray-800 dark:border-gray-700" onClick={() => navigate('/product/' + product.$id)}>
                        <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover mb-2" />
                        <h2 className="text-lg font-semibold">{product.name}</h2>
                        <p className="text-gray-600 dark:text-gray-400">${product.price.toFixed(2)}</p>
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
