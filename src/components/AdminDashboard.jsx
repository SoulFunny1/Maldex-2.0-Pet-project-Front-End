import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { LogOut, LayoutDashboard, Package, Users, Trash2, Edit, Save, X, Plus } from 'lucide-react';
import axios from 'axios';
// Firebase Imports kept for context, but not essential for CRUD logic fix
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, setLogLevel } from 'firebase/firestore';

// --- Конфигурация API (Базовая константа) ---
const API_BASE_URL = 'http://localhost:4000/api/admin/products';

// ------------------------------------------
// КОД FIREBASE (Оставлен без изменений, т.к. не относится к ошибке CRUD)
// ------------------------------------------
const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : {};
const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;
const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';

const useFirebase = () => {
    // ... (Your existing Firebase code)
    const [db, setDb] = useState(null);
    const [auth, setAuth] = useState(null);
    const [userId, setUserId] = useState(null);
    const [isAuthReady, setIsAuthReady] = useState(false);

    useEffect(() => {
        if (Object.keys(firebaseConfig).length === 0) return;

        setLogLevel('debug');
        const app = initializeApp(firebaseConfig);
        const firestore = getFirestore(app);
        const authService = getAuth(app);
        setDb(firestore);
        setAuth(authService);

        const Auth = async () => {
            if (initialAuthToken) {
                try {
                    await signInWithCustomToken(authService, initialAuthToken);
                } catch (e) {
                    // console.error("Firebase Custom Auth Failed:", e);
                    await signInAnonymously(authService);
                }
            } else {
                await signInAnonymously(authService);
            }
        }

        const unsubscribe = onAuthStateChanged(authService, (user) => {
            if (user) {
                setUserId(user.uid);
            } else {
                setUserId(null);
            }
            setIsAuthReady(true);
        });

        Auth();
        
        return () => unsubscribe();
    }, []);

    return { db, auth, userId, isAuthReady, appId };
};

// ------------------------------------------
// МОКОВЫЕ ДАННЫЕ И API (Оптимизированы для соответствия API_BASE_URL)
// ------------------------------------------
let MOCK_PRODUCTS = [
    { id: 1, mainArticul: 'A001', name: 'Gemini Laptop', category: 'Electronics', price: 1200, stock: 50, description: 'High-performance AI development laptop.' },
    { id: 2, mainArticul: 'B002', name: 'Flash T-Shirt', category: 'Apparel', price: 25, stock: 150, description: 'Comfortable cotton t-shirt with Flash logo.' },
    { id: 3, mainArticul: 'C003', name: 'Nano Banana', category: 'Food', price: 1, stock: 1000, description: 'The smallest, sweetest banana you\'ll ever taste.' },
];
let MOCK_NEXT_ID = 4;

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const mockApi = {
    // GET /api/admin/products
    fetchProducts: async () => {
        await sleep(300);
        return { data: MOCK_PRODUCTS.map(p => ({ ...p, price: Number(p.price) })) };
    },
    // POST /api/admin/products
    addProduct: async (product) => {
        await sleep(300);
        const newProduct = { 
            ...product, 
            id: MOCK_NEXT_ID++, 
            price: Number(product.price),
            stock: Number(product.stock),
        };
        MOCK_PRODUCTS.push(newProduct);
        return { data: newProduct };
    },
    // PUT /api/admin/products/:id
    updateProduct: async (product) => {
        await sleep(300);
        const index = MOCK_PRODUCTS.findIndex(p => p.id === product.id);
        if (index !== -1) {
            MOCK_PRODUCTS[index] = { 
                ...MOCK_PRODUCTS[index], 
                ...product, 
                price: Number(product.price),
                stock: Number(product.stock),
            };
            return { data: MOCK_PRODUCTS[index] };
        }
        throw new Error('404 Not Found: Product not found.');
    },
    // DELETE /api/admin/products/:id
    deleteProduct: async (id) => {
        await sleep(300);
        const initialLength = MOCK_PRODUCTS.length;
        MOCK_PRODUCTS = MOCK_PRODUCTS.filter(p => p.id !== id);
        if (MOCK_PRODUCTS.length === initialLength) {
            throw new Error('404 Not Found: Product not found.');
        }
        return { data: { message: `Product ${id} deleted successfully` } };
    },
};

// ------------------------------------------
// КОМПОНЕНТЫ (ConfirmDeleteModal, ProductForm - без изменений, они были правильные)
// ------------------------------------------

const ConfirmDeleteModal = ({ isOpen, onClose, onConfirm, productName }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-70 z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-sm transform transition-all p-6 space-y-4 border-t-4 border-red-500">
                <h3 className="text-xl font-bold text-red-600 dark:text-red-400">Confirm Deletion</h3>
                <p className="text-gray-700 dark:text-gray-300">
                    Are you sure you want to delete the product **{productName}**? This action cannot be undone.
                </p>
                <div className="flex justify-end space-x-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 dark:text-gray-200 dark:bg-gray-600 dark:hover:bg-gray-500 transition duration-150"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition duration-150 flex items-center"
                    >
                        <Trash2 size={16} className="mr-2" />
                        Delete Permanently
                    </button>
                </div>
            </div>
        </div>
    );
};

const ProductForm = ({ product, onSave, onCancel }) => {
    // Добавлены поля mainArticul и productData для соответствия бэкенд-модели
    const [formData, setFormData] = useState(product || { name: '', category: '', price: 0, stock: 0, description: '', mainArticul: '', productData: {} });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'price' || name === 'stock' ? Number(value) : value,
        }));
    };

    const handleProductDataChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            productData: {
                ...prev.productData,
                [name]: value
            }
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">{product ? 'Edit Product' : 'Add New Product'}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white p-2" />
                </div>
                <div>
                    <label htmlFor="mainArticul" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Articul (SKU)</label>
                    <input type="text" id="mainArticul" name="mainArticul" value={formData.mainArticul} onChange={handleChange} required className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white p-2" />
                </div>
                 <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Category</label>
                    <input type="text" id="category" name="category" value={formData.category} onChange={handleChange} required className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white p-2" />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Price ($)</label>
                    <input type="number" id="price" name="price" value={formData.price} onChange={handleChange} required min="0" step="0.01" className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white p-2" />
                </div>
                <div>
                    <label htmlFor="stock" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Stock</label>
                    <input type="number" id="stock" name="stock" value={formData.stock} onChange={handleChange} required min="0" className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white p-2" />
                </div>
            </div>
            
            <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg space-y-2">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Product Data (Example)</h3>
                <div>
                    <label htmlFor="color" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Color (in productData)</label>
                    <input type="text" id="color" name="color" value={formData.productData.color || ''} onChange={handleProductDataChange} className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white p-2" />
                </div>
            </div>

            <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
                <textarea id="description" name="description" value={formData.description} onChange={handleChange} rows="3" className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white p-2"></textarea>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
                <button
                    type="button"
                    onClick={onCancel}
                    className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 dark:text-gray-200 dark:bg-gray-600 dark:hover:bg-gray-500 transition duration-150"
                >
                    <X size={16} className="mr-2" />
                    Cancel
                </button>
                <button
                    type="submit"
                    className="flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition duration-150"
                >
                    <Save size={16} className="mr-2" />
                    {product ? 'Update Product' : 'Add Product'}
                </button>
            </div>
        </form>
    );
};


const ProductManager = () => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [deleteProductId, setDeleteProductId] = useState(null);
    const [deleteProductName, setDeleteProductName] = useState('');
    const [productToEdit, setProductToEdit] = useState(null);
    const [currentView, setCurrentView] = useState('list');

    const fetchProducts = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            // Использование реального axios (но роуты настроены на моки)
            const response = await axios.get(API_BASE_URL); 
            // const response = await mockApi.fetchProducts(); // Используйте это для полной изоляции
            setProducts(response.data);
        } catch (err) {
            console.error("Error fetching products:", err);
            setError(`Failed to load products: ${err.message}.`);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const handleSaveProduct = async (productToSave) => {
        setIsLoading(true);
        setError(null);
        
        try {
            if (!productToSave) throw new Error("Invalid product data provided.");

            let response;
            if (productToSave.id) {
                // UPDATE: PUT /api/admin/products/:id
                response = await axios.put(`${API_BASE_URL}/${productToSave.id}`, productToSave);
                // response = await mockApi.updateProduct(productToSave); // Mock
            } else {
                // CREATE: POST /api/admin/products
                response = await axios.post(API_BASE_URL, productToSave);
                // response = await mockApi.addProduct(productToSave); // Mock
            }
            
            fetchProducts(); 
            setCurrentView('list');
            setProductToEdit(null);

        } catch (err) {
            const errorMessage = err.response?.data?.message || err.message;
            console.error("Error saving product:", err);
            setError(`Error saving: ${errorMessage}`);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteClick = (product) => {
        setDeleteProductId(product.id);
        setDeleteProductName(product.name);
        setIsModalOpen(true);
    };

    // FIX: Используем DELETE-запрос для RESTful API
    const handleConfirmDelete = async () => {
        setIsLoading(true);
        setIsModalOpen(false);
        setError(null);

        try {
            // ИСПОЛЬЗУЕМ DELETE: /api/admin/products/:id
            await axios.delete(`${API_BASE_URL}/${deleteProductId}`);
            // await mockApi.deleteProduct(deleteProductId); // Mock

            fetchProducts();
        } catch (err) {
            const errorMessage = err.response?.data?.message || err.message;
            console.error("Deletion error:", err);
            // Сообщение об ошибке теперь будет более точным, благодаря исправлению на бэкенде
            setError(`Deletion failed: ${errorMessage}`);
        } finally {
            setIsLoading(false);
            setDeleteProductId(null);
            setDeleteProductName('');
        }
    };

    const handleCancelDelete = () => {
        setIsModalOpen(false);
        setDeleteProductId(null);
        setDeleteProductName('');
    };

    const handleEditClick = (product) => {
        setProductToEdit(product);
        setCurrentView('form');
    };

    const handleAddClick = () => {
        setProductToEdit(null); 
        setCurrentView('form');
    };

    const renderProductList = () => {
        if (isLoading) {
            return <div className="p-6 text-center text-indigo-600 dark:text-indigo-400">Loading products...</div>;
        }

        if (error) {
            return <div className="p-6 text-center text-red-600 dark:text-red-400">Error: {error}</div>;
        }

        if (products.length === 0) {
            return <div className="p-6 text-center text-gray-500 dark:text-gray-400">No products found. Click "Add New Product" to get started.</div>;
        }

        return (
            <div className="overflow-x-auto shadow-xl rounded-xl">
                <table className="min-w-full bg-white dark:bg-gray-800">
                    <thead className="bg-gray-100 dark:bg-gray-700">
                        <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider rounded-tl-xl">Articul</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Name</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Category</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Price</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider rounded-tr-xl">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        {products.map((product) => (
                            <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-150">
                                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{product.mainArticul}</td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{product.name}</td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{product.category}</td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">${Number(product.price).toFixed(2)}</td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                                    <button 
                                        onClick={() => handleEditClick(product)}
                                        className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-200 mr-3 p-1 rounded-full hover:bg-indigo-100 dark:hover:bg-gray-700 transition"
                                        title="Edit"
                                    >
                                        <Edit size={18} />
                                    </button>
                                    <button 
                                        onClick={() => handleDeleteClick(product)}
                                        className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-200 p-1 rounded-full hover:bg-red-100 dark:hover:bg-gray-700 transition"
                                        title="Delete"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    };

    const renderContent = () => {
        if (currentView === 'form') {
            return (
                <ProductForm
                    product={productToEdit}
                    onSave={handleSaveProduct}
                    onCancel={() => { setProductToEdit(null); setCurrentView('list'); }}
                />
            );
        }
        return (
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Product Inventory</h2>
                    <button
                        onClick={handleAddClick}
                        className="flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 transition duration-150 transform hover:scale-[1.02]"
                    >
                        <Plus size={20} className="mr-2" />
                        Add New Product
                    </button>
                </div>
                {renderProductList()}
            </div>
        );
    };

    return (
        <div className="p-4 md:p-8 min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            {renderContent()}

            <ConfirmDeleteModal
                isOpen={isModalOpen}
                onClose={handleCancelDelete}
                onConfirm={handleConfirmDelete}
                productName={deleteProductName}
            />
        </div>
    );
};

// ------------------------------------------
// ОСНОВНОЕ ПРИЛОЖЕНИЕ (Sidebar, ContentArea, App - без изменений)
// ------------------------------------------

const Sidebar = ({ currentSection, setSection }) => {
    const navItems = [
        { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
        { id: 'products', name: 'Products', icon: Package },
        { id: 'users', name: 'Users', icon: Users },
    ];

    return (
        <div className="w-64 bg-gray-900 text-white flex flex-col h-full fixed md:relative transform -translate-x-full md:translate-x-0 transition-transform duration-300 z-40">
            <div className="p-6 text-2xl font-bold border-b border-gray-700">Admin Panel</div>
            <nav className="flex-grow p-4 space-y-2">
                {navItems.map(item => (
                    <button
                        key={item.id}
                        onClick={() => setSection(item.id)}
                        className={`flex items-center w-full px-4 py-2 rounded-lg transition-colors duration-150 ${currentSection === item.id ? 'bg-indigo-600 text-white shadow-lg' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
                    >
                        <item.icon size={20} className="mr-3" />
                        {item.name}
                    </button>
                ))}
            </nav>
            <div className="p-4 border-t border-gray-700">
                <button
                    onClick={() => console.log('Logout action')}
                    className="flex items-center w-full px-4 py-2 rounded-lg text-red-400 hover:bg-gray-700 transition-colors duration-150"
                >
                    <LogOut size={20} className="mr-3" />
                    Logout
                </button>
            </div>
        </div>
    );
};

const ContentArea = ({ currentSection }) => {
    const renderSection = () => {
        switch (currentSection) {
            case 'dashboard':
                return <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">Dashboard Overview</h1>;
            case 'products':
                return <ProductManager />;
            case 'users':
                return <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">User Management</h1>;
            default:
                return <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">Select a Section</h1>;
        }
    };
    return (
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
            {renderSection()}
        </main>
    );
};

const App = () => {
    const [currentSection, setCurrentSection] = useState('products');
    const { userId, isAuthReady } = useFirebase();

    return (
        <div className="flex h-screen bg-gray-100 dark:bg-gray-900 font-sans">
            <Sidebar currentSection={currentSection} setSection={setCurrentSection} />
            <div className="flex flex-col flex-1 overflow-hidden">
                <header className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-md">
                    <div className="text-lg font-semibold text-gray-800 dark:text-white">
                        {currentSection.charAt(0).toUpperCase() + currentSection.slice(1)}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                        {isAuthReady ? `User ID: ${userId}` : 'Authenticating...'}
                    </div>
                </header>
                <ContentArea currentSection={currentSection} />
            </div>
        </div>
    );
};

export default App;