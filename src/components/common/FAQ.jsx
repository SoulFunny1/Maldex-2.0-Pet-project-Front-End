import React, { useState } from 'react';

// --- ИНЛАЙН SVG ИКОНКА (Стрелка/Шеврон) ---
const ChevronDownIcon = ({ isOpen, className = "" }) => (
    <svg 
        className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180 text-red-600' : 'rotate-0 text-gray-400'} ${className}`} 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
    >
        <path d="m6 9 6 6 6-6"/>
    </svg>
);

// --- КОМПОНЕНТ 1: ЭЛЕМЕНТ АККОРДЕОНА ---
const AccordionItem = ({ question, answer, isOpen, onToggle }) => {
    return (
        <div className="border-b border-gray-200">
            {/* Заголовок (Кнопка для переключения) */}
            <button
                className={`flex justify-between items-center w-full p-5 text-left transition-colors duration-300 
                            ${isOpen 
                                ? 'bg-gray-100 text-gray-900 font-bold border-l-4 border-red-600' // Сделали открытый фон серым и добавили красную полосу
                                : 'bg-white text-gray-700 hover:bg-gray-50'
                            }`}
                onClick={onToggle}
            >
                <span className="text-lg sm:text-xl font-semibold">
                    {question}
                </span>
                <ChevronDownIcon isOpen={isOpen} />
            </button>

            {/* Тело Аккордеона (Скрываемый контент) */}
            <div 
                // Контент остается белым для контраста
                className={`bg-white overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-96 opacity-100 p-5 pt-0' : 'max-h-0 opacity-0 p-0'}`}
            >
                <div className={`text-base text-gray-600 ${isOpen ? 'pt-2 border-t border-red-200' : ''}`}>
                    {answer}
                </div>
            </div>
        </div>
    );
};

// --- КОМПОНЕНТ 2: ГЛАВНЫЙ КОНТЕЙНЕР FAQ ---
const FAQAccordion = () => {
    // Временные данные для имитации вопросов и ответов
    const mockData = [
        {
            id: 1,
            question: "Каковы точные сроки доставки?",
            answer: "Стандартная доставка занимает 2-5 рабочих дней по центральному региону. Срочная доставка (в течение 24 часов) доступна в пределах МКАД. Для других регионов сроки рассчитываются индивидуально при оформлении заказа."
        },
        {
            id: 2,
            question: "Можно ли вернуть или обменять товар?",
            answer: "Да, вы можете вернуть или обменять товар надлежащего качества в течение 14 календарных дней с момента получения, при условии сохранения товарного вида и целостности упаковки. Для оформления возврата свяжитесь с нашей службой поддержки."
        },
        {
            id: 3,
            question: "Как активировать гарантию на продукт?",
            answer: "Гарантия 1 год активируется автоматически с момента покупки. В случае обнаружения заводского брака в течение этого срока, пожалуйста, предоставьте чек и описание проблемы, и мы произведем ремонт или замену за наш счет."
        },
        {
            id: 4,
            question: "Предоставляете ли вы оптовые скидки?",
            answer: "Конечно! Мы предлагаем прогрессивную систему скидок для оптовых покупателей. Минимальный оптовый заказ начинается от 50 000 рублей. Для получения индивидуального прайса, отправьте запрос на почту opt@shop.ru."
        }
    ];

    // Состояние для отслеживания, какой элемент открыт (хранит ID)
    const [openItemId, setOpenItemId] = useState(null);

    // Функция переключения: закрывает текущий и открывает новый (или закрывает, если кликнули на открытый)
    const handleToggle = (id) => {
        setOpenItemId(prevId => (prevId === id ? null : id));
    };

    return (
        // Фон всей страницы теперь светло-серый (bg-gray-100)
        <div className="min-h-screen  bg-gray-100 font-[Inter] mx-30 pt-10">
            <div className=" mx-auto bg-white rounded-xl shadow-2xl overflow-hidden ring-1 ring-gray-100">
                
                {/* Заголовок секции */}
                <h2 className="text-3xl sm:text-4xl font-black text-gray-900 p-6 border-b-4 border-red-600 inline-block">
                    Вопросы и Ответы
                </h2>

                {/* Контейнер Аккордеона */}
                <div className="mt-4">
                    {mockData.map((item) => (
                        <AccordionItem
                            key={item.id}
                            question={item.question}
                            answer={item.answer}
                            isOpen={openItemId === item.id}
                            onToggle={() => handleToggle(item.id)}
                        />
                    ))}
                </div>
                
               
            </div>
        </div>
    );
};

export default FAQAccordion;