import React, { useState } from 'react';
import axios from 'axios';

// Используем деструктуризацию props, как в вашем коде
export default function Login({ open, onClose, onSwitchToLogin }) {
    // 1. Состояния для всех полей формы
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // 2. Состояния для API и UI
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    // Если модальное окно не должно быть открыто, не рендерим его
    if (!open) {
        return null;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Проверка совпадения паролей
        

        // Минимальная длина пароля
        if (password.length < 6) {
            return setError('Пароль должен быть не менее 6 символов.');
        }

        setError('');
        setSuccess('');
        setLoading(true);

        try {
            // Отправляем данные на ваш бэкенд
            // Включаем все поля, необходимые для полной регистрации
            const response = await axios.post('http://localhost:4000/api/users/login', {
                email,
                password,
            });

            setSuccess('Авторизация прошла успешно! Вы будете автоматически перенаправлены на Главную.');
            console.log('Авторизация успешна:', response.data);
            localStorage.setItem('email', response.data.email);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('role', response.data.role);

            // Закрываем текущее окно и, возможно, переключаем на окно входа
            setTimeout(() => {
                onClose();
                if (onSwitchToLogin) onClose();
                window.location.reload();
            }, 2000);

        } catch (err) {
            // Обработка ошибок
            const errorMessage = err.response?.data?.message || 'Ошибка регистрации. Проверьте данные и попробуйте снова.';
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    // --- JSX ВЕРСТКА ---
    return (
        // Фон модального окна
        <div
            className=" inset-0 bg-opacity-50 flex items-center justify-center z-50 p-10 transition-opacity"
            onClick={onClose} // Закрытие при клике на фон
        >
            {/* Контейнер модального окна */}
            <div
                className="bg-white p-8 sm:p-10 rounded-xl shadow-2xl w-full max-w-md relative animate-slide-up" // Добавлен класс для анимации
                onClick={(e) => e.stopPropagation()} // Предотвращение закрытия при клике внутри
            >

                {/* Кнопка закрытия */}
                <button
                    className="absolute top-4 right-4 text-gray-400 hover:text-red-600 transition"
                    onClick={onClose}
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>

                {/* Заголовок и Вкладки */}
                <div className="flex mb-8 bg-gray-100 rounded-lg overflow-hidden shadow-inner-sm">
                    <button
                        // Используем onSwitchToLogin для переключения на Вход

                        className="flex-grow py-3 px-4 bg-gray-800 font-semibold text-white text-base hover:bg-gray-900 transition duration-200 ease-in-out"
                    >
                        Вход
                    </button>
                    <button
                        onClick={onSwitchToLogin}
                        className="flex-grow py-3 px-4 text-gray-700 font-semibold text-base bg-transparent hover:bg-gray-200 transition duration-200 ease-in-out"
                    >
                        Регистрация
                    </button>
                </div>

                <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Вход</h3>

                <form onSubmit={handleSubmit} className="space-y-5">



                    {/* 3. Поле Почта */}
                    <input
                        type="email"
                        placeholder="Почта"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full px-5 py-3 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-200 ease-in-out text-base"
                    />

                    {/* 4. Поле Пароль */}
                    <input
                        type="password"
                        placeholder="Пароль"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength="6"
                        className="w-full px-5 py-3 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-200 ease-in-out text-base"
                    />

                    {/* Сообщения об ошибке/успехе */}
                    {(error || success) && (
                        <div className={`p-3 rounded-lg text-sm font-medium ${error ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                            {error || success}
                        </div>
                    )}

                    {/* Кнопка Регистрации */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex items-center justify-center bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.01]"
                    >
                        {loading ? (
                            <svg className="animate-spin h-5 w-5 text-white mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        ) : (
                            'Авторизоваться'
                        )}
                    </button>
                </form>

                {/* Текст о политике данных (снизу) */}
                <p className="text-center text-xs text-gray-500 mt-6 leading-relaxed">
                    Нажимая кнопку, я соглашаюсь с{' '}
                    <a href="#" className="text-red-600 hover:text-red-700 hover:underline font-medium transition-colors duration-200">
                        политикой обработки данных
                    </a>
                    .
                </p>
            </div>
        </div>
    );
}