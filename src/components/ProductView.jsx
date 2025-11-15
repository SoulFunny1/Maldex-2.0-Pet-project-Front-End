import React, { useState, useMemo } from 'react';
import { ShoppingCart, Zap, Heart, Minus, Plus, Ruler, Grid } from 'lucide-react';

// Имитация URL вашего API
const API_BASE_URL = 'http://localhost:4000/api/products'; 

// --- MOCK ДАННЫЕ ПРОДУКТА (ЭКО-Ручка) ---
const mockProduct = {
    id: 100200,
    mainArticul: 'PEN002ECO',
    name: 'Экологичная шариковая ручка',
    basePrice: 7500, // Цена в копейках (75,00 ₽)
    currency: '₽',
    description: "Экологичная шариковая ручка с корпусом из переработанного картона. Внутри мягкий стержень, который пишет плавно и не оставляет клякс. Идеально для ежедневного использования в офисе или дома.",
    
    // Варианты цветов и изображений (точно как на скриншоте)
    productData: {
        currentImg: 'https://placehold.co/600x600/f3e8d7/786058?text=Eco+Pen+Beige', // Default beige pen
        colorVariants: [
            { code: 'beige', hex: '#B5A99C', name: 'Бежевый', img: 'https://placehold.co/600x600/f3e8d7/786058?text=Eco+Pen+Beige' },
            { code: 'mint', hex: '#94B5A5', name: 'Мятный', img: 'https://placehold.co/600x600/d0e5d0/374e37?text=Eco+Pen+Mint' },
            { code: 'green', hex: '#D0E5D0', name: 'Зеленый', img: 'https://placehold.co/600x600/d9eed9/4a6d4a?text=Eco+Pen+Green' },
            { code: 'brown', hex: '#786058', name: 'Коричневый', img: 'https://placehold.co/600x600/e0c9c2/4a3c36?text=Eco+Pen+Brown' },
        ],
    },
    
    // Варианты продукта (как "размер" или "тип")
    productVariants: [
        { code: 'standard', name: 'Стандарт', priceModifier: 0 },
        { code: 'mini', name: 'Мини', priceModifier: -1000 },
        { code: 'maxi', name: 'Макси', priceModifier: 500 },
    ],
    
    // Характеристики (для блока "Характнектики")
    characteristics: [
        { label: 'Вес', value: '0,015 кг' },
        { label: 'Материал', value: 'Картон' },
        { label: 'Тип печати', value: 'УФ-печать' },
    ],
    
    // Скидки в зависимости от количества
    quantityDiscounts: [
        { count: 1, discount: 0 },
        { count: 100, discount: 5 }, // 5% при заказе 100 шт.
        { count: 300, discount: 7 },
        { count: 500, discount: 9 }, 
    ],
    
    // Доступность
    stock: 8000,
};

// --- ФОРМАТИРОВАНИЕ ДЕНЕГ ---
const formatCurrency = (amountInKopecks, currency = '₽') => {
    const rubles = (amountInKopecks / 100).toFixed(2);
    return `${rubles.replace('.', ',')}${currency}`;
};

// --- ОСНОВНОЙ КОМПОНЕНТ ---
const EcoPenProductView = () => {
    const [product, setProduct] = useState(mockProduct);
    const [selectedColor, setSelectedColor] = useState(mockProduct.productData.colorVariants[0]);
    const [selectedVariant, setSelectedVariant] = useState(mockProduct.productVariants.find(v => v.code === 'maxi')); // Default to Maxi as per screenshot
    const [quantity, setQuantity] = useState(0);
    const [activeBranding, setActiveBranding] = useState('Тампопечать на корпус'); // Default branding
    
    // Имитация загрузки (для продакшн)
    // useEffect(() => {
    //     // fetch logic or initial setup
    // }, []);

    // Вычисление цены и скидки
    const { finalPricePerUnit, totalOrderPrice, totalDiscountAmount, totalFinalPrice, bestDiscount } = useMemo(() => {
        if (!product) return {};

        // 1. Цена за единицу с учетом варианта
        let pricePerUnit = product.basePrice + (selectedVariant?.priceModifier || 0);

        // 2. Определяем лучшую скидку, соответствующую общему количеству
        const applicableDiscount = product.quantityDiscounts
            .slice()
            .sort((a, b) => b.count - a.count)
            .find(d => quantity >= d.count);
            
        const discountRate = applicableDiscount ? applicableDiscount.discount : 0;
        
        // 3. Рассчитываем итоговую стоимость и скидку
        const totalPrc = quantity * pricePerUnit;
        const discount = totalPrc * discountRate / 100;
        const finalPrc = totalPrc - discount;
        
        // 4. Финальная цена за единицу с учетом скидки (для отображения)
        const finalPricePerUnit = pricePerUnit * (1 - (discountRate / 100));

        return {
            finalPricePerUnit: finalPricePerUnit,
            totalOrderPrice: totalPrc,
            totalDiscountAmount: discount,
            totalFinalPrice: finalPrc,
            bestDiscount: applicableDiscount,
        };
    }, [quantity, product, selectedVariant]);
    
    // Обработка изменения количества
    const handleQuantityChange = (type) => {
        let newQty = quantity;
        if (type === 'increment') {
            newQty = Math.min(product.stock, quantity + 1);
        } else if (type === 'decrement') {
            newQty = Math.max(0, quantity - 1);
        } else if (typeof type === 'number') {
            newQty = Math.min(product.stock, Math.max(0, type));
        }
        setQuantity(newQty);
    };

    if (!product) {
        return <div className="min-h-screen flex items-center justify-center bg-gray-50 p-8 text-red-700">Ошибка: Данные о товаре не найдены.</div>;
    }
    
    // Логика скидки для отображения
    const discountNextLevel = product.quantityDiscounts.find(d => d.count > quantity);
    const discountText = discountNextLevel 
        ? `Скидка: ${activeDiscount.discount}% До следующих ${discountNextLevel.discount}% осталось ${discountNextLevel.count - quantity} шт.`
        : `Макс. скидка: ${activeDiscount.discount}% Достигнуто.`;
    const activeDiscount = product.quantityDiscounts.slice().reverse().find(d => quantity >= d.count) || { discount: 0 };


    return (
        <div className="min-h-screen bg-gray-50 font-[Inter] text-gray-900 p-4 sm:p-8 flex justify-center">
            <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-10">
                
                {/* --- Левая колонка (Изображение и Нанесение) --- */}
                <div className="space-y-6">
                    <div className="relative bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                        {/* Основное изображение */}
                        <div className="flex justify-center items-center p-8 aspect-square">
                            <img 
                                src={selectedColor.img} 
                                alt={product.name} 
                                className="w-full h-auto max-h-[400px] object-contain rounded-lg"
                                onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/400x400/f3f4f6/a1a1a1?text=Image+Error"; }}
                            />
                        </div>
                        
                        {/* Миниатюры */}
                        <div className="flex justify-center space-x-3 mt-4">
                            {product.productData.colorVariants.map((color) => (
                                <div 
                                    key={color.code}
                                    onClick={() => setSelectedColor(color)}
                                    className="w-16 h-16 rounded-md overflow-hidden cursor-pointer transition-all border-2"
                                    style={{ 
                                        borderColor: selectedColor.code === color.code ? '#B5A99C' : '#E5E7EB', // Бежевый акцент
                                        boxShadow: selectedColor.code === color.code ? '0 0 0 2px rgba(181, 169, 156, 0.5)' : 'none'
                                    }}
                                    title={color.name}
                                >
                                    <img 
                                        src={`https://placehold.co/64x64/${color.hex.substring(1)}/ffffff?text=${color.name.slice(0, 1)}`} 
                                        alt={color.name} 
                                        className="w-full h-full object-cover"
                                        onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/64x64/${color.hex.substring(1)}/ffffff?text=N/A`; }}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    {/* Нижний левый блок (Нанесение) */}
                    <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-100">
                        <h3 className="text-xl font-bold mb-3 text-gray-900">Оппсииме и Нанесение</h3>
                        <p className="text-gray-700 text-sm leading-relaxed mb-4">Экологичная шариковая ручка имеет картридж из биоразлагаемого пластика и скоро станет полностью компостируемой. Мы заботимся не только о качестве, но и о природе. Позаботьтесь о планете, выбирая этот товар.</p>
                        
                        {/* Варианты нанесения */}
                        <div className="flex flex-wrap gap-2 items-center">
                            <span className="text-sm text-gray-500 mr-2 flex items-center space-x-1">
                                <Zap size={14} className="text-gray-400" />
                                <span>Нанесение:</span>
                            </span>
                             <button
                                onClick={() => setActiveBranding('Тампопечать на корпус')}
                                className={`px-4 py-1.5 text-sm rounded-full transition-all duration-200 border ${
                                    activeBranding === 'Тампопечать на корпус'
                                        ? 'bg-gray-800 text-white border-gray-800' 
                                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                                }`}
                            >
                                Тампопечать на корпус
                            </button>
                             <button
                                onClick={() => setActiveBranding('УФ-печать')}
                                className={`px-4 py-1.5 text-sm rounded-full transition-all duration-200 border ${
                                    activeBranding === 'УФ-печать' 
                                        ? 'bg-gray-800 text-white border-gray-800' 
                                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                                }`}
                            >
                                УФ-печать
                            </button>
                        </div>
                    </div>
                </div>
                
                {/* --- Правая колонка (Инфо и Заказ) --- */}
                <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-100 h-fit space-y-6">
                    
                    {/* Заголовок и Артикул */}
                    <div>
                        <div className="flex justify-between items-start">
                            <h1 className="text-2xl font-bold text-gray-900 mb-1">{product.name}</h1>
                            <button className="text-gray-400 hover:text-red-600 transition-colors p-1 rounded-md" title="В избранное">
                                <Heart size={20} />
                            </button>
                        </div>
                        <p className="text-sm text-gray-500">Артикул: <span className="text-gray-700">{product.mainArticul}</span></p>
                    </div>
                    
                    {/* Цена */}
                    <div className="mb-4 pt-3 border-b border-gray-100 pb-4">
                        <span className="text-4xl font-extrabold text-gray-900 mr-2">{formatCurrency(product.basePrice)}</span>
                        <span className="text-sm text-gray-500">/{formatCurrency(finalPricePerUnit)} за шт.</span>
                    </div>
                    
                    {/* Варианты цвета */}
                    <div className="space-y-3 pt-3 border-b border-gray-100 pb-4">
                        <span className="font-semibold text-gray-700">Цвет:</span>
                        <div className="flex space-x-3">
                            {product.productData.colorVariants.map((color) => (
                                <div
                                    key={color.code}
                                    onClick={() => setSelectedColor(color)}
                                    className={`w-8 h-8 rounded-full border-2 cursor-pointer transition-all duration-200`}
                                    style={{ 
                                        backgroundColor: color.hex, 
                                        borderColor: selectedColor?.code === color.code ? color.hex : '#E5E7EB',
                                        boxShadow: selectedColor?.code === color.code ? '0 0 0 3px #fff, 0 0 0 4px #ccc' : 'none'
                                    }}
                                    title={color.name}
                                />
                            ))}
                        </div>
                    </div>
                    
                    {/* Индикатор скидки */}
                    <div className="text-sm text-gray-600 border-b border-gray-100 pb-4">
                        <p>{discountText}</p>
                        <div className="relative h-1 bg-gray-200 rounded-full w-full mt-2">
                             <div 
                                className="absolute top-0 h-full bg-red-500 rounded-full"
                                style={{ width: `${Math.min(100, (quantity / 500) * 100)}%` }} // Условный прогресс до 500 шт.
                            ></div>
                        </div>
                    </div>
                    
                    {/* Вариант (Стандарт, Мини, Макси) */}
                    <div className="space-y-3">
                        <span className="font-semibold text-gray-700">Вариант</span>
                        <div className="flex space-x-2">
                            {product.productVariants.map((variant) => (
                                <button
                                    key={variant.code}
                                    onClick={() => setSelectedVariant(variant)}
                                    className={`px-4 py-2 text-sm rounded-lg transition-all duration-200 border ${
                                        selectedVariant?.code === variant.code 
                                            ? 'bg-gray-800 text-white border-gray-800' 
                                            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                                    }`}
                                >
                                    {variant.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Ваш Заказ */}
                    <div className="space-y-3 pt-3 border-t border-gray-100">
                        <span className="font-semibold text-gray-700">Ваш Заказ</span>
                        <div className="flex items-center space-x-4">
                            {/* Поле ввода количества */}
                             <div className="flex items-center bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                                <button
                                    type="button"
                                    onClick={() => handleQuantityChange('decrement')}
                                    disabled={quantity <= 0}
                                    className="p-3 text-gray-600 hover:bg-gray-200 disabled:opacity-50 transition-colors"
                                >
                                    <Minus size={16} />
                                </button>
                                <input
                                    type="text"
                                    value={quantity}
                                    onChange={(e) => handleQuantityChange(parseInt(e.target.value, 10) || 0)}
                                    min="0"
                                    max={product.stock}
                                    className="w-16 text-center text-xl font-bold p-3 outline-none bg-transparent"
                                />
                                <button
                                    type="button"
                                    onClick={() => handleQuantityChange('increment')}
                                    disabled={quantity >= product.stock}
                                    className="p-3 text-gray-600 hover:bg-gray-200 disabled:opacity-50 transition-colors"
                                >
                                    <Plus size={16} />
                                </button>
                            </div>
                            <span className="text-sm text-gray-500">Доступно на складе: {product.stock} шт.</span>
                        </div>
                    </div>
                    
                    {/* Итоговый блок */}
                    <div className="space-y-4 pt-3 border-t border-gray-100">
                        <h4 className="font-semibold text-gray-700">Итоговый блок</h4>
                        
                        <div className="text-sm text-gray-600 space-y-1">
                            <div className="flex justify-between">
                                <span>Общее количество:</span>
                                <span className="font-bold text-gray-900">{quantity} шт.</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Сумма:</span>
                                <span className="font-bold text-gray-900">{formatCurrency(totalFinalPrice)}</span>
                            </div>
                        </div>
                        
                        {/* КНОПКИ */}
                        <div className="flex space-x-3 pt-2">
                             <button
                                className="flex-1 bg-red-600 text-white p-3 rounded-lg shadow-md hover:bg-red-700 transition duration-300 font-bold flex items-center justify-center space-x-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
                                disabled={quantity === 0}
                            >
                                <ShoppingCart size={20} />
                                <span>Добавить в корзину</span>
                            </button>
                            <button
                                className="flex-1 border border-gray-300 text-gray-800 p-3 rounded-lg hover:bg-gray-100 transition duration-300 font-semibold flex items-center justify-center space-x-2 disabled:text-gray-400 disabled:border-gray-200 disabled:cursor-not-allowed"
                                disabled={quantity === 0}
                            >
                                <Zap size={20} />
                                <span>Добавить нанесение</span>
                            </button>
                        </div>
                    </div>
                    
                    {/* Характеристики (точно как на скриншоте) */}
                    <div className="pt-3 border-t border-gray-100 space-y-2">
                        <h4 className="font-semibold text-gray-700">Характнектики</h4>
                        <div className="text-sm space-y-1">
                             {product.characteristics.map((char, index) => (
                                <div key={index} className="flex justify-between">
                                    <span className="text-gray-500">{char.label}:</span>
                                    <span className="font-medium text-gray-700">{char.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};


export default EcoPenProductView;