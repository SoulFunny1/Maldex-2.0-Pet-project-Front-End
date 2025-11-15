import { Outlet, useNavigate } from 'react-router-dom';
import Header from '../components/common/Header';
import Register from '../components/register';
import Login from '../components/login';
import Categories from '../components/categories';
import Slider from '../pages/Slider';
import AllCategories from '../components/allCategories';
import { useState, useEffect, useCallback } from 'react';
import AdminDashboard from '../components/AdminDashboard';
import helloUser from '../components/helloUser';
import ProductInHeader from '../components/ProductsInHeader';
import FAQ from '../components/common/FAQ';
import Footer from '../components/common/footer';
import axios from 'axios';


axios.defaults.withCredentials = true;

export default function Layout() {
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState('home');
  const [isAdmin, setIsAdmin] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showWelcome, setShowWelcome] = useState(true);

  // Проверка авторизации через backend
  const checkAuthStatus = useCallback(async () => {
  try {
    const response = await axios.get('http://localhost:4000/api/users/me', { withCredentials: true });

    if (response.status === 200) {
      const userData = response.data;

      // Определяем роль на основе статуса
      const isAdmin = userData.status === 'inactive';
      const isUser = userData.status === 'active';

      setIsLoggedIn(true);
      setUser(isUser ? userData : null);
      setIsAdmin(isAdmin);

      console.log(
        `✅ Пользователь авторизован: ${isAdmin ? 'Админ' : isUser ? 'Обычный пользователь' : 'Неизвестный статус'}`,
        userData
      );
    } else {
      setIsLoggedIn(false);
      setUser(null);
      setIsAdmin(false);
    }
  } catch (error) {
    console.warn('❌ Пользователь не авторизован:', error.message);
    setIsLoggedIn(false);
    setUser(null);
    setIsAdmin(false);
  } finally {
    setIsLoading(false);
  }
}, []);


  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  // После успешного входа
  const handleLoginSuccess = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
    setIsLoginModalOpen(false);
    setIsAdmin(userData.role === 'admin');
    console.log('🔓 Вход выполнен успешно');
  };

  // Выход
  const handleLogout = async () => {
        try {
            // ИСПРАВЛЕНИЕ: Добавлен протокол http://
            await axios.post('http://localhost:4000/api/users/logout');
            console.log('Выход успешен');
            // В реальном приложении здесь будет window.location.href = '/login';
            console.log('Вы успешно вышли из системы');
            window.location.reload();
        } catch (e) {
            console.error('Ошибка при выходе:', e);
            console.log('Ошибка при выходе из системы');
        }
    };

  // Клик по профилю
  const handleUserMenuClick = () => {
    setIsRegisterModalOpen(false);
    setIsLoginModalOpen(false);
    setIsProfileModalOpen(false);

    if (isLoggedIn) {
      setIsProfileModalOpen(true);
    } else {
      setIsLoginModalOpen(true);
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

  // Переход в админку
  const handleAdminPageClick = () => {
    setIsProfileModalOpen(false);
    navigate('/admin');
  };

  // Клик по логотипу — возвращение на главную
  const allPagesClose = () => {
    setIsRegisterModalOpen(false);
    setIsLoginModalOpen(false);
    setIsProfileModalOpen(false);
    setIsAdmin(false);
    navigate('/');
  };

  const helloUser = () => {
    setIsRegisterModalOpen(false);
    setIsLoginModalOpen(false);
    setIsProfileModalOpen(false);
    setIsAdmin(false);
    navigate('/hellouser');
    setShowWelcome(true);
  };

  if (isLoading) {
    return (
      <div className="bg-gray-100 min-h-screen flex items-center justify-center font-sans">
        <div className="flex items-center space-x-3 p-8 bg-white rounded-xl shadow-lg">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          <p className="text-xl font-medium text-gray-700">Загрузка...</p>
        </div>
      </div>
    );
  }

  const isModalOpen = isRegisterModalOpen || isLoginModalOpen || isProfileModalOpen;

  return (
    <div className="w-full min-h-screen bg-gray-100 font-sans">
      <Header
        helloUser={helloUser}
        allClose={allPagesClose}
        onAdminClick={handleAdminPageClick}
        openUserMenu={handleUserMenuClick}
        isLoggedIn={isLoggedIn}
        user={user}
        onLogout={handleLogout}
        isAdmin={isAdmin}
        isUser={user}
      />

      {!isModalOpen && (
        <div className="pb-10">
          <Categories />
          <Slider />
          <AllCategories />
          <Outlet />
        </div>
      )}

      {/* Модалка регистрации */}
      {!isLoggedIn && isRegisterModalOpen && (
        <Register
          to="/register"
          onSwitchToLogin={openLoginFromRegister}
          open={isRegisterModalOpen}
          onClose={() => setIsRegisterModalOpen(false)}
        />
      )}

      {/* Модалка логина */}
      {!isLoggedIn && isLoginModalOpen && (
        <Login
          to="/login"
          open={isLoginModalOpen}
          onSwitchToLogin={openRegisterModal}
          onLoginSuccess={handleLoginSuccess}
          onClose={() => setIsLoginModalOpen(false)}
        />
      )}

      {isLoggedIn && isProfileModalOpen && (
        <AdminDashboard
          isAdminPage={handleAdminPageClick}
          onClose={() => setIsProfileModalOpen(false)}
          user={user}
          onLogout={handleLogout}
        />
      )}
      <ProductInHeader />
      <FAQ />
      <Footer />
    </div>
  );
}
