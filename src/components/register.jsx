import React, { useState } from 'react';
import axios from 'axios';

// Принимаем props onClose для закрытия окна
export default function Register({ open, onClose, Link }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    // Если модальное окно не должно быть открыто, не рендерим его
    if (!open) {
        return null;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        try {
            // Отправляем данные на ваш бэкенд
            const response = await axios.post('http://localhost:4000/api/users/register', {
                email,
                password,
            });

            setSuccess('Регистрация прошла успешно! Теперь вы можете войти.');
            // Можно закрыть окно через 2 секунды после успешной регистрации
            setTimeout(() => {
                onClose(); 
            }, 2000);

        } catch (err) {
            // Обработка ошибок от сервера (409 Conflict, 400 Bad Request и т.д.)
            const errorMessage = err.response?.data?.message || 'Ошибка регистрации. Попробуйте снова.';
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div 
            className="pb-10  bg-gray-100 bg-opacity-70 h-screen flex items-center justify-center z-50" 
            onClick={onClose} // Закрытие при клике на фон
        >
            {/* Модальное окно */}
            <div 
                className="bg-white p-8 sm:p-10 rounded-xl shadow-2xl w-full max-w-md relative animate-fade-in" 
                onClick={(e) => e.stopPropagation()} // Предотвращение закрытия при клике внутри
            >
                {/* Кнопка закрытия */}
                <button 
                    className="absolute top-4 right-4 text-gray-500 hover:text-red-600 transition" 
                    onClick={onClose}
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>

                <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Создать аккаунт</h2>
                <p className="text-gray-500 text-center mb-8">Зарегистрируйтесь, чтобы видеть цены и делать заказы</p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Поле Email */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="example@maldex.ru"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 transition duration-150"
                        />
                    </div>

                    {/* Поле Пароль */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Пароль</label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Минимум 6 символов"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            minLength="6"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 transition duration-150"
                        />
                    </div>

                    {/* Сообщения об ошибке/успехе */}
                    {error && (
                        <div className="p-3 bg-red-100 text-red-700 rounded-lg text-sm font-medium">
                            {error}
                        </div>
                    )}
                    {success && (
                        <div className="p-3 bg-green-100 text-green-700 rounded-lg text-sm font-medium">
                            {success}
                        </div>
                    )}

                    {/* Кнопка Регистрации */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex items-center justify-center bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-xl transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        ) : (
                            'Зарегистрироваться'
                        )}
                    </button>
                </form>

                {/* Ссылка на Вход (если нужно) */}
                <div className="mt-6 text-center text-sm">
                    Уже есть аккаунт? <a href="/login" className="text-red-600 hover:text-red-700 transition duration-150">Вход</a>
                </div>
            </div>
        </div>
    );
}