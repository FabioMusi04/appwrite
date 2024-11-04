import React, { useEffect, useState } from 'react';
import { Product, ProductIns } from '../../utils/types';
import { CreateProduct, DeleteProduct, GenerateProducts, GetProducts, UpdateCart, UpdateProduct } from '../../utils/appwriteconfig';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Alert from '../../components/alert';

const AdminProductsPage: React.FC = () => {
    const [alert, setAlert] = useState<{ message: string; type: 'info' | 'success' | 'warning' | 'error'; handleClose: () => void }>({ message: '', type: 'info', handleClose: () => { } });

    const [products, setProducts] = useState<Product[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState<Omit<ProductIns, 'id'>>(
        {
            name: '',
            description: '',
            price: 0,
            imageUrl: '',
            isDiscounted: false,
            discount: 0,
            stock: 0,
        }
    );
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(10);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await GetProducts(1, 200);
            setProducts(response as Product[]);
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
                await UpdateProduct(selectedProduct.$id, formData);

                setAlert({ message: 'Product updated successfully', type: 'success', handleClose: () => setAlert({ message: '', type: 'info', handleClose: () => { } }) });
            } else {
                await CreateProduct(formData);

                setAlert({ message: 'Product saved successfully', type: 'success', handleClose: () => setAlert({ message: '', type: 'info', handleClose: () => { } }) });
            }
            fetchProducts();
            resetForm();
        } catch (error) {
            console.error('Error saving product:', error);
            setAlert({ message: 'Error saving product', type: 'error', handleClose: () => setAlert({ message: '', type: 'info', handleClose: () => { } }) });
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
            await DeleteProduct(id);
            setAlert({ message: 'Product deleted successfully', type: 'success', handleClose: () => setAlert({ message: '', type: 'info', handleClose: () => { } }) });
            fetchProducts();
        } catch (error) {
            console.error('Error deleting product:', error);
            setAlert({ message: 'Error deleting product', type: 'error', handleClose: () => setAlert({ message: '', type: 'info', handleClose: () => { } }) });
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

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(products.length / productsPerPage);


    const generateProducts = async () => {
        try {
            const result = await GenerateProducts();
            if (result) {
                setAlert({ message: 'Sample products generated successfully', type: 'success', handleClose: () => setAlert({ message: '', type: 'info', handleClose: () => { } }) });
                fetchProducts();
            } else {
                setAlert({ message: 'Error generating sample products', type: 'error', handleClose: () => setAlert({ message: '', type: 'info', handleClose: () => { } }) });
            }
        } catch (error) {
            console.error('Error generating products:', error);
            setAlert({ message: 'Error generating sample products', type: 'error', handleClose: () => setAlert({ message: '', type: 'info', handleClose: () => { } }) });
        }
    }

    return (
        <div className="grow p-6 dark:bg-gray-900 dark:text-white">
            {
                alert.message != "" && (
                    <Alert type={alert.type} message={alert.message} onClose={alert.handleClose} />
                )
            }
            <h1 className="text-3xl font-semibold text-center mb-6">Admin Products</h1>
            <button onClick={generateProducts} className="mb-6 w-full p-3 bg-green-500 text-white rounded-md hover:bg-green-600 dark:bg-green-700 dark:hover:bg-green-800">
                Generate Sample Products
            </button>

            <form className="mb-8 space-y-4 bg-gray-50 p-6 rounded-lg shadow-md dark:bg-gray-800" onSubmit={handleSubmit}>
                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
                    <div>
                        <label className="block mb-1 text-sm font-medium">Product Name</label>
                        <input type="text" name="name" placeholder="Product Name" value={formData.name} onChange={handleInputChange} className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600" required />
                    </div>
                    <div>
                        <label className="block mb-1 text-sm font-medium">Price</label>
                        <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleInputChange} className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600" required />
                    </div>
                </div>
                <label className="block mb-1 text-sm font-medium">Product Description</label>
                <textarea name="description" placeholder="Product Description" value={formData.description} onChange={handleInputChange} className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600" required />

                <label className="block mb-1 text-sm font-medium">Image URL</label>
                <input type="text" name="imageUrl" placeholder="Image URL" value={formData.imageUrl} onChange={handleInputChange} className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600" required />

                <div className="flex items-center mb-4">
                    <input type="checkbox" name="isDiscounted" checked={formData.isDiscounted} onChange={(e) => setFormData({ ...formData, isDiscounted: e.target.checked })} className="mr-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label className="text-sm font-medium">Discounted</label>
                </div>
                {formData.isDiscounted && (
                    <div>
                        <label className="block mb-1 text-sm font-medium">Discount</label>
                        <input type="number" name="discount" placeholder="Discount" value={formData.discount} onChange={handleInputChange} className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600" />
                    </div>
                )}
                <label className="block mb-1 text-sm font-medium">Stock Quantity</label>
                <input type="number" name="stock" placeholder="Stock" value={formData.stock} onChange={handleInputChange} className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600" required />

                <div className="flex gap-4 mt-4">
                    <button type="submit" className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800">
                        {isEditing ? 'Update Product' : 'Add Product'}
                    </button>
                    {isEditing && (
                        <button type="button" onClick={resetForm} className="w-full py-2 bg-red-500 text-white rounded-md hover:bg-red-600 dark:bg-red-700 dark:hover:bg-red-800">
                            Cancel
                        </button>
                    )}
                </div>
            </form>
            
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-700">
                    <thead>
                        <tr className="border-b bg-gray-200 dark:bg-gray-700">
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
                            <tr key={product.$id} className="border-b text-center dark:border-gray-700">
                                <td className="p-4">
                                    <img src={product.imageUrl} alt={product.name} className="w-16 h-16 object-cover rounded" />
                                </td>
                                <td className="p-4">{product.name}</td>
                                <td className="p-4 truncate max-w-xs">{product.description}</td>
                                <td className="p-4">${product.price.toFixed(2)}</td>
                                <td className="p-4">{product.stock}</td>
                                <td className="p-4">
                                    <button onClick={() => handleEdit(product)} className="p-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 dark:bg-yellow-700 dark:hover:bg-yellow-800 mr-2">
                                        <FaEdit />
                                    </button>
                                    <button onClick={() => handleDelete(product.$id)} className="p-2 bg-red-500 text-white rounded hover:bg-red-600 dark:bg-red-700 dark:hover:bg-red-800">
                                        <MdDelete />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-between items-center mt-6">
                <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1} className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800">
                    Previous
                </button>
                <span className="text-sm">Page {currentPage} of {totalPages}</span>
                <button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800">
                    Next
                </button>
            </div>
        </div>
    );
};

export default AdminProductsPage;
