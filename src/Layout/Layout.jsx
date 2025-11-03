import { Outlet, useNavigate } from 'react-router-dom';
import Header from '../components/common/Header';
import Register from '../components/register';
import Login from '../components/login';
import Categories from '../components/categories';
import Slider from '../pages/Slider';
import AllCategories from '../components/allCategories';
import UserPage from '../pages/userPage';
import { useState, useEffect } from 'react';
import axios from 'axios';

axios.defaults.withCredentials = true;

export default function Layout() {
  const navigate = useNavigate();
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Проверяем авторизацию
  async function checkAuthStatus() {
    try {
      const response = await axios.get('http://localhost:4000/api/users/me', { withCredentials: true });
      setIsLoggedIn(true);
      setUser(response.data);
      console.log('✅ Пользователь авторизован:', response.data);
    } catch (error) {
      setIsLoggedIn(false);
      setUser(null);
      console.warn('❌ Не авторизован:', error.message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    checkAuthStatus();
  }, []);

  // После успешного входа
  const handleLoginSuccess = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
    setIsLoginModalOpen(false);
    console.log('🔓 Вход выполнен успешно');
  };

  // Выход
  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:4000/api/users/logout');
      setIsLoggedIn(false);
      setUser(null);
      setIsProfileModalOpen(false);
      navigate('/');
      console.log('🚪 Выход выполнен');
    } catch (error) {
      console.error('Ошибка при выходе:', error.message);
      setIsLoggedIn(false);
      setUser(null);
      setIsProfileModalOpen(false);
      navigate('/');
    }
  };

  // Клик по профилю
  const handleUserMenuClick = () => {
    if (isLoggedIn) {
      setIsProfileModalOpen(true); // просто открываем профиль как окно
    } else {
      setIsLoginModalOpen(true); // открываем логин поверх всего
    }
  };

  // Переключения между модалками
  const openLoginFromRegister = () => {
    setIsRegisterModalOpen(false);
    setIsLoginModalOpen(true);
  };

  const openRegisterModal = () => {
    setIsLoginModalOpen(false);
    setIsRegisterModalOpen(true);
  };

  if (isLoading) {
    return <div className="text-center p-8">Загрузка...</div>;
  }

  return (
    <div className="w-full min-h-screen bg-gray-100">
      {/* Header */}
      <Header
        openUserMenu={handleUserMenuClick}
        isLoggedIn={isLoggedIn}
        user={user}
        onLogout={handleLogout}
      />

      {/* Если нет открытых модалок — показываем обычные блоки */}
      {(!isRegisterModalOpen && !isLoginModalOpen && !isProfileModalOpen) && (
        <>
          <Categories />
          <Slider />
          <AllCategories />
          <main className="p-4">
            <Outlet />
          </main>
        </>
      )}

      {/* Модалка регистрации */}
      {!isLoggedIn && isRegisterModalOpen && (
        <Register
          onSwitchToLogin={openLoginFromRegister}
          open={isRegisterModalOpen}
          onClose={() => setIsRegisterModalOpen(false)}
        />
      )}

      {/* Модалка логина */}
      {!isLoggedIn && isLoginModalOpen && (
        <Login
          open={isLoginModalOpen}
          onSwitchToLogin={openRegisterModal}
          onLoginSuccess={handleLoginSuccess}
          onClose={() => setIsLoginModalOpen(false)}
        />
      )}

      {/* Модалка профиля */}
      {isLoggedIn && isProfileModalOpen && (
        <UserPage
          user={user}
          onLogout={handleLogout}
          onClose={() => setIsProfileModalOpen(false)}
        />
      )}
    </div>
  );
}
