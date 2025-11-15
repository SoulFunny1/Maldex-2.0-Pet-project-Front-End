import React from 'react';

// --- КОМПОНЕНТ ФУТЕРА ---
const FooterComponent = () => {
    // Данные для колонок
    const primaryInfo = {
        logo: 'akbar',
        email: 'izmailov2009@gmail.com',
        phoneHeader: 'Бесплатный звонок из любой точки Казахстана',
        phoneNumber: '8-702\n701-5075' // Используем \n для переноса строки
    };

    const categories = [
        'Коллекции', 'Автомобильные аксессуары', 'Деловые подарки', 'Для дома', 
        'Для отдыха', 'Для путешествий', 'Для спорта', 
        'Пишущие инструменты', 'Сумки', 'Вкусные подарки', 'Товары для детей', 
        'Упаковка', 'Электроника', 'Подарочные наборы',
        'Женские аксессуары', 'Зонты', 'Кухня и посуда', 'Личные', 
        'Мужские аксессуары', 'Одежда', 'Для офиса'
    ];
    
    // Группируем категории по 3 столбцам для основной секции
    const col1 = categories.slice(0, 7);
    const col2 = categories.slice(7, 14);
    const col3 = categories.slice(14);


    const sections = [
        'Главная', 'О компании', 'Каталог', 'Доставка и оплата', 
        'Новости и статьи', 'Команда', 'Наши дилеры'
    ];

    const contactInfo = {
        moscow: {
            city: 'Мы в Москве:',
            address: 'Огородный проезд, д. 5, стр. 2',
            phone: '+7 (499) 704-33-62'
        },
        spb: {
            city: 'Мы в Санкт-Петербурге',
            address: 'Московский пр. 10-12',
            phone: '+7 (812) 389-44-14'
        }
    };

    // Вспомогательный компонент для вывода ссылок
    const LinkList = ({ items }) => (
        <ul className="space-y-1.5">
            {items.map((item, index) => (
                <li key={index}>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                        {item}
                    </a>
                </li>
            ))}
        </ul>
    );

    return (
        // Главный контейнер с темным фоном
        <footer className="bg-[#0B1A28] text-white font-[Inter] py-12 px-4 sm:px-8">
            <div className="max-w-6xl mx-auto">
                {/* -------------------- ВЕРХНЯЯ СЕКЦИЯ: ЛОГОТИП И КОНТАКТЫ -------------------- */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 border-b border-gray-700/50 pb-8">
                    
                    {/* Колонка 1: Логотип и Почта */}
                    <div className="space-y-2">
                        <p className="text-gray-400 text-sm">По всем вопросам</p>
                        <h2 className="text-4xl font-extrabold leading-none">
                            {primaryInfo.logo}
                        </h2>
                        <p className="text-xl font-light text-white border-b-2 border-white inline-block pb-1">
                            @{primaryInfo.email}
                        </p>
                    </div>

                    {/* Колонка 2: Бесплатный звонок */}
                    <div className="space-y-2 lg:col-start-4 lg:text-right">
                        <p className="text-gray-400 text-sm">{primaryInfo.phoneHeader}</p>
                        {/* Имитация крупного шрифта с переносом */}
                        <div className="text-5xl font-extrabold leading-none text-white">
                            {primaryInfo.phoneNumber.split('\n').map((line, index) => (
                                <div key={index}>{line}</div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* -------------------- НИЖНЯЯ СЕКЦИЯ: ССЫЛКИ И АДРЕСА -------------------- */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-x-8 gap-y-10 pt-8 text-sm">
                    
                    {/* Колонка A: Основные Категории (Группа 1) */}
                    <div>
                        <h4 className="uppercase font-semibold text-gray-400 mb-3 tracking-wider">
                            Основные категории
                        </h4>
                        <LinkList items={col1} />
                    </div>

                    {/* Колонка B: Основные Категории (Группа 2) */}
                    <div className="md:col-span-1">
                        <LinkList items={col2} />
                    </div>

                    {/* Колонка C: Основные Категории (Группа 3) */}
                    <div className="md:col-span-1">
                        <LinkList items={col3} />
                    </div>

                    {/* Колонка D: Разделы и Контакты (Сгруппированы) */}
                    <div className="space-y-8">
                        {/* Разделы сайта */}
                        <div>
                            <h4 className="uppercase font-semibold text-gray-400 mb-3 tracking-wider">
                                Разделы
                            </h4>
                            <LinkList items={sections} />
                        </div>
                        
                        {/* Контакты / Адреса */}
                        <div>
                            <h4 className="uppercase font-semibold text-gray-400 mb-3 tracking-wider">
                                Адрес
                            </h4>
                            <div className="space-y-4 text-sm">
                                {/* Москва */}
                                <div className="text-gray-300">
                                    <p className="font-semibold text-white">{contactInfo.moscow.city}</p>
                                    <p>{contactInfo.moscow.address}</p>
                                    <p>Телефон: {contactInfo.moscow.phone}</p>
                                </div>
                                {/* Санкт-Петербург */}
                                <div className="text-gray-300">
                                    <p className="font-semibold text-white">{contactInfo.spb.city}</p>
                                    <p>{contactInfo.spb.address}</p>
                                    <p>Телефон: {contactInfo.spb.phone}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ДОПОЛНИТЕЛЬНЫЕ ССЫЛКИ ПОД ОСНОВНЫМИ КОЛОНКАМИ (почти как на скриншоте) */}
                <div className="pt-8 grid grid-cols-2 md:grid-cols-4 gap-8">
                    {/* Ссылка "Стать дилером" и "Контакты" внизу */}
                    <div>
                        <h4 className="uppercase font-semibold text-gray-400 mb-3 tracking-wider">
                            Партнерство
                        </h4>
                        <ul className="space-y-1.5">
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Стать дилером</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Контакты</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default FooterComponent;