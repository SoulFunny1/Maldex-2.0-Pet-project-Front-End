import React, { useState, useEffect, useMemo } from 'react';

// =========================================================================
// 1. ИНЛАЙН SVG ИКОНКИ (ЗАМЕНА LUCIDE-REACT)
// (Оставлены без изменений, как в предыдущей версии)
// =========================================================================

// Иконка Обновления (RefreshCcw)
const RefreshCcw = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 2v6h6"/><path d="M21 12a9 9 0 0 0-9-9c-2.49 0-4.73 1.05-6.32 2.76L3 8"/><path d="M21 22v-6h-6"/><path d="M3 12a9 9 0 0 0 9 9c2.49 0 4.73-1.05 6.32-2.76L21 16"/>
    </svg>
);

// Иконка Загрузки (Loader)
const Loader = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v4"/><path d="M12 18v4"/><path d="M4.93 4.93l2.83 2.83"/><path d="M16.24 16.24l2.83 2.83"/><path d="M2 12h4"/><path d="M18 12h4"/><path d="M4.93 19.07l2.83-2.83"/><path d="M16.24 7.76l2.83-2.83"/>
    </svg>
);

// Иконка Ошибки (AlertTriangle)
const AlertTriangle = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h18.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
    </svg>
);

// Иконка Товара (Package)
const Package = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12.89 1.45l8 4A2 2 0 0 1 22 7.24v9.52a2 2 0 0 1-1.11 1.79l-8 4A2 2 0 0 1 12 21.45v-18A2 2 0 0 1 12.89 1.45z"/><path d="M12 2.45v18"/><path d="M4.92 5.61l4 2"/><path d="M19.08 5.61l-4 2"/><path d="M4.92 18.39l4-2"/><path d="M19.08 18.39l-4 2"/>
    </svg>
);

// Иконка Редактирования (Edit)
const Edit = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
    </svg>
);

// Иконка Корзины (Trash2)
const Trash2 = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M15 6V4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v2"/>
    </svg>
);

// Иконка Сохранения (Save)
const Save = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/>
    </svg>
);

// Иконка Добавления (Plus)
const Plus = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
    </svg>
);

// Иконка Закрытия (X)
const X = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
);

// Иконка Поиска (Search)
const Search = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
    </svg>
);


// =========================================================================
// 2. ГЛАВНАЯ ЛОГИКА КОМПОНЕНТОВ
// =========================================================================

// !!! ВАЖНО: АДРЕСА API !!! 
// Укажите корректный URL для вашего сервера Node.js и маршрута.
const API_BASE_URL = 'http://localhost:4000'; // Убедитесь, что это верный адрес
const ENDPOINT = '/api/admin/products'; 

// Структура для создания нового товара
const defaultNewProduct = {
    id: null, 
    mainArticul: '',
    name: '',
    category: 'Одежда/Футболки',
    description: '',
    price: 0.00,
    stock: 0,
    weight: 0.000,
    packageVolume: 0.0000,
    quantityInPackage: 1,
    transportPackageType: 'Картонный короб (T1)',
    individualPackageType: 'Индивидуальный пакет',
    // Эти поля будут преобразованы в JSON перед отправкой
    brandingTypes: '["Шелкография"]', 
    productData: '{"color": "белый", "img": ["https://placehold.co/600x600/CCCCCC/000000?text=NEW+PRODUCT"]}', 
};

// Вспомогательная функция для безопасного парсинга JSON
const safeParseJson = (jsonString) => {
    try {
        if (jsonString && typeof jsonString === 'string' && (jsonString.startsWith('{') || jsonString.startsWith('['))) {
            return JSON.parse(jsonString);
        }
        return {};
    } catch (e) {
        console.error("Ошибка парсинга JSON в productData/brandingTypes:", e, jsonString);
        return {};
    }
};

const ProductFormModal = ({ product, onClose, onSave, isSaving, isNew }) => {
    const [formData, setFormData] = useState({
        ...defaultNewProduct,
        ...product,
    });

    // Декодируем сложные поля для редактирования
    const parsedData = useMemo(() => safeParseJson(formData.productData), [formData.productData]);
    const parsedBranding = useMemo(() => safeParseJson(formData.brandingTypes), [formData.brandingTypes]);
    
    const [color, setColor] = useState(parsedData.color || '');
    const [imageUrl, setImageUrl] = useState(Array.isArray(parsedData.img) ? parsedData.img[0] || '' : '');
    const [brandingList, setBrandingList] = useState(Array.isArray(parsedBranding) ? parsedBranding.join(', ') : '');

    useEffect(() => {
        // Синхронизация при открытии модала с новым продуктом
        if (product) {
            const data = safeParseJson(product.productData);
            const branding = safeParseJson(product.brandingTypes);
            setColor(data.color || '');
            setImageUrl(Array.isArray(data.img) ? data.img[0] || '' : '');
            setBrandingList(Array.isArray(branding) ? branding.join(', ') : '');
            setFormData({ ...product });
        }
    }, [product]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // 1. Сборка обновленного JSON для поля productData
        const currentParsedData = safeParseJson(formData.productData); // Берем оригинальный объект, чтобы сохранить все поля, кроме тех, что редактируются
        const updatedProductData = JSON.stringify({
            ...currentParsedData, 
            color: color,
            img: imageUrl ? [imageUrl] : [], 
        });
        
        // 2. Сборка обновленного JSON для поля brandingTypes
        const updatedBrandingTypes = JSON.stringify(
            brandingList.split(',').map(item => item.trim()).filter(item => item !== '')
        );

        // Объект, который будет отправлен на сервер
        const updatedProduct = {
            ...formData,
            id: isNew ? undefined : formData.id, 
            price: parseFloat(formData.price) || 0,
            stock: parseInt(formData.stock) || 0,
            weight: parseFloat(formData.weight) || 0,
            packageVolume: parseFloat(formData.packageVolume) || 0,
            quantityInPackage: parseInt(formData.quantityInPackage) || 1,
            productData: updatedProductData, 
            brandingTypes: updatedBrandingTypes, 
        };
        
        onSave(updatedProduct, isNew);
    };

    const title = isNew ? 'Добавить новый товар' : `Редактировать: ${product.name}`;

    const categoryOptions = ['Одежда/Футболки', 'Одежда/Толстовки', 'Аксессуары/Головные уборы', 'Аксессуары/Рюкзаки', 'Аксессуары/Посуда', 'Другое'];
    const packageTypeOptions = ['Картонный короб (T1)', 'Транспортный мешок (T2)', 'Паллета (P1)', 'Нет'];

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-start justify-center z-50 p-4 overflow-y-auto">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl mt-8 mb-8 transform transition-all scale-100">
                <div className="p-6 border-b flex justify-between items-center bg-gray-50 rounded-t-xl">
                    <h2 className="text-xl font-bold text-gray-800">{title}</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition">
                        <X className="w-6 h-6" />
                    </button>
                </div>
                
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    
                    {/* ... (Форма осталась без изменений, она работает с локальным стейтом) ... */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <label className="block">
                            <span className="text-sm font-medium text-gray-700">Название товара *</span>
                            <input type="text" name="name" value={formData.name} onChange={handleChange} required className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-3 border" />
                        </label>
                        <label className="block">
                            <span className="text-sm font-medium text-gray-700">Главный артикул (SKU) *</span>
                            <input type="text" name="mainArticul" value={formData.mainArticul} onChange={handleChange} required className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-3 border" />
                        </label>
                    </div>

                    <label className="block">
                        <span className="text-sm font-medium text-gray-700">Категория</span>
                        <select name="category" value={formData.category} onChange={handleChange} className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-3 border bg-white">
                            {categoryOptions.map(option => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>
                    </label>

                    <label className="block">
                        <span className="text-sm font-medium text-gray-700">Полное описание (Поле `description`)</span>
                        <textarea name="description" value={formData.description} onChange={handleChange} rows="4" className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-3 border"></textarea>
                    </label>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <label className="block">
                            <span className="text-sm font-medium text-gray-700">Цена (руб.) *</span>
                            <input type="number" step="0.01" name="price" value={formData.price} onChange={handleChange} required className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-3 border" />
                        </label>
                        <label className="block">
                            <span className="text-sm font-medium text-gray-700">Остаток на складе</span>
                            <input type="number" name="stock" value={formData.stock} onChange={handleChange} className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-3 border" />
                        </label>
                        <label className="block">
                            <span className="text-sm font-medium text-gray-700">Вес (кг)</span>
                            <input type="number" step="0.001" name="weight" value={formData.weight} onChange={handleChange} className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-3 border" />
                        </label>
                        <label className="block">
                            <span className="text-sm font-medium text-gray-700">Объем (м³)</span>
                            <input type="number" step="0.0001" name="packageVolume" value={formData.packageVolume} onChange={handleChange} className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-3 border" />
                        </label>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                         <label className="block">
                            <span className="text-sm font-medium text-gray-700">Штук в упаковке</span>
                            <input type="number" name="quantityInPackage" value={formData.quantityInPackage} onChange={handleChange} className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-3 border" />
                        </label>
                        <label className="block">
                            <span className="text-sm font-medium text-gray-700">Тип транспортной упаковки</span>
                            <select name="transportPackageType" value={formData.transportPackageType} onChange={handleChange} className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-3 border bg-white">
                                {packageTypeOptions.map(option => (
                                    <option key={option} value={option}>{option}</option>
                                ))}
                            </select>
                        </label>
                        <label className="block">
                            <span className="text-sm font-medium text-gray-700">Тип индивидуальной упаковки</span>
                            <input type="text" name="individualPackageType" value={formData.individualPackageType} onChange={handleChange} className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-3 border" />
                        </label>
                    </div>

                    {/* Поля, хранящиеся в JSON-строках (productData и brandingTypes) */}
                    <h3 className="text-md font-semibold text-gray-800 pt-4 border-t">Дополнительные данные</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <label className="block">
                            <span className="text-sm font-medium text-gray-700">Цвет (из `productData`)</span>
                            <input type="text" name="color" value={color} onChange={(e) => setColor(e.target.value)} className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-3 border" />
                        </label>
                        <label className="block sm:col-span-2">
                            <span className="text-sm font-medium text-gray-700">URL Изображения (из `productData.img[0]`)</span>
                            <input type="url" name="imageUrl" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-3 border" />
                        </label>
                    </div>
                    <label className="block">
                        <span className="text-sm font-medium text-gray-700">Типы брендирования (через запятую)</span>
                        <input type="text" value={brandingList} onChange={(e) => setBrandingList(e.target.value)} placeholder="Например: Вышивка, Шелкография, Тиснение" className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-3 border" />
                    </label>


                    <div className="pt-4 flex justify-end">
                        <button
                            type="submit"
                            disabled={isSaving}
                            className="flex items-center bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 transition duration-150 disabled:opacity-50 shadow-md hover:shadow-lg"
                        >
                            {isSaving ? <Loader className="w-5 h-5 mr-2 animate-spin" /> : <Save className="w-5 h-5 mr-2" />} 
                            {isSaving ? (isNew ? 'Создание...' : 'Сохранение...') : (isNew ? 'Создать товар' : 'Сохранить изменения')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};


// =========================================================================
// 3. ГЛАВНЫЙ КОМПОНЕНТ ПРИЛОЖЕНИЯ (ADMIN DASHBOARD)
// =========================================================================

const App = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isSaving, setIsSaving] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [editingProduct, setEditingProduct] = useState(null); 
    const [isCreating, setIsCreating] = useState(false); 

    // ФУНКЦИЯ ЗАГРУЗКИ (GET) - ИСПОЛЬЗУЕТ РЕАЛЬНЫЙ FETCH
    const fetchProducts = async () => {
        setLoading(true);
        setError(null);
        const url = API_BASE_URL + ENDPOINT; 
        
        try {
            // --- РЕАЛЬНЫЙ GET ЗАПРОС К БЭКЕНДУ ---
            const response = await fetch(url);
            
            if (!response.ok) {
                // Если статус не 200-299, бросаем ошибку
                const errorText = await response.text();
                throw new Error(`HTTP error! Status: ${response.status}. Details: ${errorText}`);
            }
            
            const data = await response.json();
            // Проверяем, что получили массив (иначе может быть ошибка)
            if (!Array.isArray(data)) {
                 throw new Error("API вернул не массив. Проверьте структуру данных на бэкенде.");
            }
            
            setProducts(data); 
            console.log("Товары успешно загружены с бэкенда:", data);

        } catch (err) {
            console.error('Не удалось загрузить товары:', err);
            setError(`Не удалось загрузить данные. Проверьте: 1. Сервер запущен? 2. Cors настроен? 3. URL: ${url}. Детали: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    // ФУНКЦИЯ СОХРАНЕНИЯ/СОЗДАНИЯ (POST ИЛИ PUT) - ИСПОЛЬЗУЕТ РЕАЛЬНЫЙ FETCH
    const handleSaveProduct = async (updatedProduct, isNew) => {
        setIsSaving(true);
        
        // Удаляем временный/фиктивный ID для нового товара
        const productToSend = { ...updatedProduct };
        if (isNew) {
            delete productToSend.id; 
        }

        const url = API_BASE_URL + ENDPOINT + (isNew ? '' : `/${productToSend.id}`);
        const method = isNew ? 'POST' : 'PUT'; 

        try {
            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    // !!! ВАЖНО: Добавьте токен авторизации, если требуется:
                    // 'Authorization': 'Bearer YOUR_AUTH_TOKEN'
                },
                body: JSON.stringify(productToSend),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`HTTP error! Status: ${response.status}. Details: ${errorText}`);
            }
            
            // Предполагаем, что сервер возвращает созданный/обновленный объект
            const savedProduct = await response.json();

            if (isNew) {
                // Добавляем новый товар в начало списка
                setProducts(prev => [savedProduct, ...prev]);
                console.log(`[${method}] Новый товар создан:`, savedProduct);
            } else {
                // Обновляем существующий товар
                setProducts(prevProducts => 
                    prevProducts.map(p => 
                        p.id === savedProduct.id ? savedProduct : p
                    )
                );
                console.log(`[${method}] Товар ID ${savedProduct.id} обновлен.`);
            }

            setEditingProduct(null); 
            setIsCreating(false); 

        } catch (e) {
            console.error(`Ошибка при ${isNew ? 'создании' : 'сохранении'} на сервере:`, e);
            setError(`Ошибка при ${isNew ? 'создании' : 'сохранении'} товара. Проверьте консоль. Детали: ${e.message}`);
        } finally {
            setIsSaving(false);
        }
    };

    // ФУНКЦИЯ УДАЛЕНИЯ (DELETE) - ИСПОЛЬЗУЕТ РЕАЛЬНЫЙ FETCH
    const handleDeleteProduct = async (productId) => {
        // !!! ВАЖНО: В реальном приложении здесь должна быть реализована 
        // Кастомная модаль для подтверждения, вместо блокирующего alert/confirm.
        
        // Просто логируем, чтобы не блокировать UI, но в продакшене нужна модаль!
        console.warn(`Попытка удаления товара ID ${productId}...`);
        
        setIsSaving(true);
        const url = `${API_BASE_URL}${ENDPOINT}/${productId}`;

        try {
            const response = await fetch(url, {
                method: 'DELETE',
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`HTTP error! Status: ${response.status}. Details: ${errorText}`);
            }
            
            // Если удаление успешно, обновляем локальное состояние
            setProducts(prev => prev.filter(p => p.id !== productId));
            console.log(`[DELETE] Товар ID ${productId} удален.`);

        } catch (e) {
            console.error('Ошибка при удалении на сервере:', e);
            setError(`Ошибка при удалении товара ID ${productId}. Проверьте консоль. Детали: ${e.message}`);
        } finally {
            setIsSaving(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []); 

    const filteredProducts = useMemo(() => {
        if (!searchTerm) {
            return products;
        }
        const lowerCaseSearch = searchTerm.toLowerCase();
        return products.filter(product => 
            (product.name && product.name.toLowerCase().includes(lowerCaseSearch)) ||
            (product.mainArticul && product.mainArticul.toLowerCase().includes(lowerCaseSearch))
        );
    }, [products, searchTerm]);

    // ... (Остальные вспомогательные компоненты и рендеринг остались без изменений) ...
    const LoadingState = () => (
        <div className="flex flex-col items-center justify-center p-12 bg-white/50 rounded-xl shadow-lg">
            <Loader className="w-10 h-10 text-indigo-500 animate-spin" />
            <p className="mt-4 text-gray-700 font-semibold">Загрузка данных о товарах...</p>
        </div>
    );

    const ErrorState = () => (
        <div className="flex flex-col items-center justify-center p-10 bg-red-100 rounded-xl border border-red-400 shadow-lg">
            <AlertTriangle className="w-8 h-8 text-red-600" />
            <p className="mt-4 text-lg font-semibold text-red-800">Ошибка подключения к API</p>
            <p className="mt-2 text-sm text-red-600 text-center">{error}</p>
            <button
                onClick={fetchProducts}
                className="mt-4 flex items-center bg-red-600 text-white px-5 py-2 rounded-xl hover:bg-red-700 transition duration-150 shadow-md"
            >
                <RefreshCcw className="w-4 h-4 mr-2" /> Повторить попытку
            </button>
        </div>
    );
    
    const ProductTable = () => (
        <div className="bg-white p-6 rounded-xl shadow-2xl">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <h2 className="text-2xl font-bold text-gray-800">Каталог товаров ({filteredProducts.length}/{products.length})</h2>
                
                <div className="flex space-x-3 w-full sm:w-auto">
                     <div className="relative w-full sm:w-64">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Поиск по названию или SKU..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-indigo-500 focus:border-indigo-500 transition"
                        />
                    </div>
                    <button
                        onClick={() => setIsCreating(true)}
                        className="flex items-center bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700 transition duration-150 shadow-md whitespace-nowrap"
                    >
                        <Plus className="w-5 h-5 mr-1" /> Добавить
                    </button>
                    <button
                        onClick={fetchProducts}
                        disabled={loading || isSaving}
                        className="flex items-center bg-gray-500 text-white px-4 py-2 rounded-xl hover:bg-gray-600 transition duration-150 disabled:opacity-50 shadow-md"
                    >
                        <RefreshCcw className="w-5 h-5" />
                    </button>
                </div>
            </div>
            
            {filteredProducts.length === 0 && !loading && (
                <div className="text-center py-10 text-gray-500">
                    <Package className="w-12 h-12 mx-auto text-gray-300" />
                    <p className="mt-4 text-xl">
                        {searchTerm ? "Ничего не найдено по вашему запросу." : "В каталоге нет товаров."}
                    </p>
                </div>
            )}

            {filteredProducts.length > 0 && (
                <div className="overflow-x-auto rounded-xl border border-gray-200">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-indigo-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-bold text-indigo-700 uppercase tracking-wider">ID</th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-indigo-700 uppercase tracking-wider">Артикул</th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-indigo-700 uppercase tracking-wider">Название</th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-indigo-700 uppercase tracking-wider">Цена</th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-indigo-700 uppercase tracking-wider">Остаток</th>
                                <th className="px-6 py-3 text-center text-xs font-bold text-indigo-700 uppercase tracking-wider">Действия</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-100">
                            {filteredProducts.map((product) => (
                                <tr key={product.id} className="hover:bg-indigo-50 transition duration-150">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{product.mainArticul}</td>
                                    <td className="px-6 py-4 text-sm font-semibold text-gray-800 max-w-xs">{product.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-700 font-bold">{Number(product.price).toFixed(2)} ₽</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${product.stock > 100 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                            {product.stock}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                                        <div className="flex space-x-3 justify-center">
                                            <button 
                                                onClick={() => setEditingProduct(product)}
                                                className="text-indigo-600 hover:text-indigo-900 flex items-center transition"
                                                title="Редактировать"
                                            >
                                                <Edit className="w-5 h-5" />
                                            </button>
                                            <button 
                                                onClick={() => handleDeleteProduct(product.id)}
                                                disabled={isSaving}
                                                className="text-red-600 hover:text-red-900 flex items-center transition disabled:opacity-50"
                                                title="Удалить"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );

    const modalProduct = editingProduct || defaultNewProduct;
    const isModalOpen = !!editingProduct || isCreating;

    return (
        <div className="min-h-screen bg-gray-100 p-4 sm:p-8 font-sans">
            <header className="mb-8 text-center">
                <h1 className="text-4xl font-extrabold text-indigo-700 tracking-tight">
                    Полноценный Админ-Дашборд Товаров
                </h1>
                <p className="mt-2 text-lg text-gray-500">Управление каталогом с полным набором полей CRUD</p>
                {/* Выводим текущий API URL для отладки */}
                 <p className="mt-1 text-sm text-indigo-500">
                    API Endpoint: <code className='bg-indigo-50 p-1 rounded-md'>{API_BASE_URL}{ENDPOINT}</code>
                </p>
                {isSaving && (
                    <div className="mt-4 flex items-center justify-center text-indigo-600 font-medium bg-indigo-100 p-2 rounded-lg shadow-inner">
                        <Loader className="w-4 h-4 mr-2 animate-spin" />
                        Операция выполняется...
                    </div>
                )}
            </header>

            <main className="max-w-7xl mx-auto">
                {error && <ErrorState />}
                
                {!error && loading && <LoadingState />}

                {!error && !loading && <ProductTable />}
            </main>

            {/* Модальное окно */}
            {isModalOpen && (
                <ProductFormModal
                    product={modalProduct}
                    onClose={() => { setEditingProduct(null); setIsCreating(false); }}
                    onSave={handleSaveProduct}
                    isSaving={isSaving}
                    isNew={isCreating}
                />
            )}
        </div>
    );
};

export default App;