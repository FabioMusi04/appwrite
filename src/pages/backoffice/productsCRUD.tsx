import React, { useEffect, useState } from 'react';
import { Product } from '../../utils/types';
import { GenerateProducts, GetProducts, ID } from '../../utils/appwriteConfig';
import { FaEdit  } from "react-icons/fa";
import { MdDelete } from "react-icons/md";


const AdminProductsPage: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState<Omit<Product, 'id'>>({
        name: '',
        description: '',
        price: 0,
        imageUrl: '',
        isDiscounted: false,
        discount: 0,
        stock: 0,
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(10); // Number of products per page

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await GetProducts(1, 100); // Fetch a larger set for pagination
            setProducts(response);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === 'price' || name === 'discount' || name === 'stock' ? Number(value) : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (isEditing && selectedProduct) {
                //await axios.put(`/api/products/${selectedProduct.id}`, { ...formData });
            } else {
                //await axios.post('/api/products', { ...formData });
            }
            fetchProducts(); // Refresh the product list
            resetForm();
        } catch (error) {
            console.error('Error saving product:', error);
        }
    };

    const handleEdit = (product: Product) => {
        setSelectedProduct(product);
        setFormData({
            name: product.name,
            description: product.description,
            price: product.price,
            imageUrl: product.imageUrl,
            isDiscounted: product.isDiscounted,
            discount: product.discount,
            stock: product.stock,
        });
        setIsEditing(true);
    };

    const handleDelete = async (id: string) => {
        try {
           // await axios.delete(`/api/products/${id}`);
            fetchProducts();
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    const resetForm = () => {
        setSelectedProduct(null);
        setIsEditing(false);
        setFormData({
            name: '',
            description: '',
            price: 0,
            imageUrl: '',
            isDiscounted: false,
            discount: 0,
            stock: 0,
        });
    };

    // Pagination Logic
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(products.length / productsPerPage);

    return (
        <div className="grow px-4 py-6 dark:bg-gray-900 dark:text-white">
            <h1 className="text-2xl font-bold mb-4">Admin Products</h1>
            <button onClick={GenerateProducts} className="mb-4 w-full p-2 bg-green-500 text-white rounded hover:bg-green-600 dark:bg-green-700 dark:hover:bg-green-800">
                Generate Products
            </button>
            <form className="mb-6" onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Product Name" value={formData.name} onChange={handleInputChange} className="w-full p-2 mb-2 border rounded dark:bg-gray-800 dark:border-gray-700" required />
                <textarea name="description" placeholder="Product Description" value={formData.description} onChange={handleInputChange} className="w-full p-2 mb-2 border rounded dark:bg-gray-800 dark:border-gray-700" required />
                <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleInputChange} className="w-full p-2 mb-2 border rounded dark:bg-gray-800 dark:border-gray-700" required />
                <input type="text" name="imageUrl" placeholder="Image URL" value={formData.imageUrl} onChange={handleInputChange} className="w-full p-2 mb-2 border rounded dark:bg-gray-800 dark:border-gray-700" required />
                <label className="flex items-center mb-2">
                    <input type="checkbox" name="isDiscounted" checked={formData.isDiscounted} onChange={(e) => setFormData({ ...formData, isDiscounted: e.target.checked })} className="mr-2 dark:bg-gray-800 dark:border-gray-700" />
                    Is Discounted
                </label>
                {formData.isDiscounted && (
                    <input type="number" name="discount" placeholder="Discount" value={formData.discount} onChange={handleInputChange} className="w-full p-2 mb-2 border rounded dark:bg-gray-800 dark:border-gray-700" />
                )}
                <input type="number" name="stock" placeholder="Stock" value={formData.stock} onChange={handleInputChange} className="w-full p-2 mb-2 border rounded dark:bg-gray-800 dark:border-gray-700" required />
                <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800">
                    {isEditing ? 'Update Product' : 'Add Product'}
                </button>
                {isEditing && (
                    <button type="button" onClick={resetForm} className="mt-2 w-full p-2 bg-red-500 text-white rounded hover:bg-red-600 dark:bg-red-700 dark:hover:bg-red-800">
                        Cancel
                    </button>
                )}
            </form>

            <table className="min-w-full bg-white dark:bg-gray-800">
                <thead>
                    <tr className="border-b dark:border-gray-700">
                        <th className="p-4 text-center">Image</th>
                        <th className="p-4 text-center">Name</th>
                        <th className="p-4 text-center">Description</th>
                        <th className="p-4 text-center">Price</th>
                        <th className="p-4 text-center">Stock</th>
                        <th className="p-4 text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentProducts.map((product) => (
                        <tr key={ID.unique()} className="border-b dark:border-gray-700 text-center">
                            <td className="p-4">
                                <img src={product.imageUrl} alt={product.name} className="w-16 h-16 object-cover rounded" />
                            </td>
                            <td className="p-4">{product.name}</td>
                            <td className="p-4">{product.description}</td>
                            <td className="p-4">${product.price.toFixed(2)}</td>
                            <td className="p-4">{product.stock}</td>
                            <td className="p-4">
                                <button onClick={() => handleEdit(product)} className="p-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 dark:bg-yellow-700 dark:hover:bg-yellow-800">
                                    <FaEdit/>
                                </button>
                                <button onClick={() => handleDelete(product.id)} className="ml-2 p-2 bg-red-500 text-white rounded hover:bg-red-600 dark:bg-red-700 dark:hover:bg-red-800">
                                    <MdDelete/>
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

export default AdminProductsPage;
