import React, { useEffect, useState } from 'react';
import { Product } from '../utils/types';
import { GetSuggestedProducts } from '../utils/appwriteconfig';

const HomePage: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchProducts() {
            try {
                const suggestedProducts = await GetSuggestedProducts() as Product[];
                setProducts(suggestedProducts);
            } catch (err) {
                setError('You must authenticate to view this section.');
            }
        }

        fetchProducts();
    }, []);

    return (
        <div className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            <header className="bg-white dark:bg-gray-800 shadow">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold">E-Commerce</h1>
                </div>
            </header>

            <section className="bg-blue-600 dark:bg-blue-800 text-white py-20">
                <div className="container mx-auto text-center">
                    <h2 className="text-4xl font-bold mb-4">Welcome to Our Online Store</h2>
                    <p className="mb-8">Find the best products at unbeatable prices!</p>
                    <a href="/products" className="bg-white dark:bg-gray-700 text-blue-600 dark:text-white px-4 py-2 rounded-lg font-semibold">
                        Shop Now
                    </a>
                </div>
            </section>

            <section id="products" className="container mx-auto py-20">
                <h2 className="text-3xl font-bold text-center mb-8">Suggested Products For you</h2>
                {error ? (
                    <div className="text-center text-red-500">{error}</div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {products.map((product) => (
                            <div key={product.$id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                                <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover" />
                                <div className="p-4">
                                    <h3 className="text-lg font-semibold">{product.name}</h3>
                                    <p className="text-gray-700 dark:text-gray-300">${product.price.toFixed(2)}</p>
                                    <a href={`/product/${product.$id}`} className="bg-blue-600 dark:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold block mt-2">
                                        View Product
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            <footer className="bg-white dark:bg-gray-800 py-10">
                <div className="container mx-auto text-center">
                    <p className="text-gray-600 dark:text-gray-300">&copy; 2024 E-Commerce. All Rights Reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default HomePage;
