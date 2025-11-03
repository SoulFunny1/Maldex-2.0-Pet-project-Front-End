import React, { useState } from 'react';
import { Settings, LayoutGrid, LogOut, FileText, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Вспомогательный компонент для иконок в верхнем меню
const ProfileHeader = ({ icon: Icon, title, isActive, onClick }) => (
    <div 
        className={`flex flex-col items-center p-4 cursor-pointer transition-colors ${
            isActive ? 'text-red-600 border-b-2 border-red-600 bg-white shadow-sm' : 'text-gray-500 hover:text-red-500'
        }`}
        onClick={onClick}
    >
        <Icon size={24} />
        <span className="mt-2 text-sm font-medium">{title}</span>
    </div>
);

// Компонент для секции "Настройки / Персональные данные"
const SettingsContent = () => {
    return (
        <div className="p-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Настройки</h2>
            
            <div className="mb-6">
                <h3 className="text-base font-semibold text-gray-700 mb-4">Персональные данные</h3>
                
                <form className="space-y-4">
                    {/* Поле Имя */}
                    <input
                        type="text"
                        placeholder="Имя"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 transition-colors shadow-sm text-gray-700"
                    />
                    
                    {/* Поле Фамилия */}
                    <input
                        type="text"
                        placeholder="Фамилия"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 transition-colors shadow-sm text-gray-700"
                    />
                    
                    {/* Поле Почта */}
                    <input
                        type="email"
                        placeholder="Почта"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 transition-colors shadow-sm text-gray-700"
                    />

                    {/* Кнопка Оформить */}
                    <button
                        type="submit"
                        className="w-full bg-red-600 text-white font-semibold py-3 rounded-lg hover:bg-red-700 transition-colors shadow-lg shadow-red-500/50"
                    >
                        Оформить
                    </button>
                </form>
            </div>
        </div>
    );
};


// Основной компонент страницы пользователя
export default function UserPage() {
    const navigate = useNavigate();
    // Состояние для активной вкладки (по умолчанию "Настройки")
    const [activeTab, setActiveTab] = useState('settings'); 

    const menuItems = [
        { key: 'settings', title: 'Настройки', icon: Settings, route: '#' },
        { key: 'builder', title: 'Конструктор предложений', icon: LayoutGrid, route: '#' },
        { key: 'auth', title: 'Регистрация/Вход', icon: LogOut, route: '/' },
        { key: 'logout', title: 'Выйти из ЛК', icon: LogOut, action: () => {
            console.log('Выход из ЛК'); 
            // Здесь должна быть логика выхода, которая передается через контекст или пропсы
            // В данной демонстрации просто перейдем на главную
            navigate('/');
        }},
        { key: 'files', title: 'Файлы и прайсы', icon: FileText, route: '#' },
        { key: 'favorites', title: 'Любимые товары', icon: Heart, route: '#' },
    ];

    const handleMenuClick = (item) => {
        setActiveTab(item.key);
        if (item.route) {
            navigate(item.route);
        } else if (item.action) {
            item.action();
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 font-sans">
            {/* Верхнее меню (макет Image_0576c6) */}
            <div className="w-full bg-white shadow-md">
                <div className="max-w-7xl mx-auto flex justify-around border-b border-gray-200">
                    {menuItems.map((item) => (
                        <ProfileHeader
                            key={item.key}
                            icon={item.icon}
                            title={item.title}
                            isActive={activeTab === item.key}
                            onClick={() => handleMenuClick(item)}
                        />
                    ))}
                </div>
            </div>

            {/* Основное содержимое страницы */}
            <div className="max-w-7xl mx-auto p-8">
                <div className="bg-white rounded-xl shadow-lg w-full max-w-lg mx-auto">
                    {activeTab === 'settings' && <SettingsContent />}
                    {/* Здесь можно добавить другие компоненты для других вкладок (builder, files, favorites и т.д.) */}
                    {activeTab !== 'settings' && (
                        <div className="p-8 text-center text-gray-500">
                            Содержимое для вкладки "{menuItems.find(i => i.key === activeTab)?.title || ''}"
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
