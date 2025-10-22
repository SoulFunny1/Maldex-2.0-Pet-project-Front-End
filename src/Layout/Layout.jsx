import { Outlet } from 'react-router-dom';
import Header from '../components/common/Header'; // Импорт верный!
import Home from '../pages/Home';
import Slider from '../pages/Slider';
import Categories from '../components/categories';
import AllCategories from '../components/allCategories';
import Register from '../components/register'
import Login from '../components/login';
import { useState } from 'react';

import styles from "./Layout.module.css";

export default function Layout() {
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  return (
    <div className={`{${styles.container} bg-gray-100`}>

      <Header openUserMenu={() => setIsRegisterModalOpen(true)} />
      {isRegisterModalOpen && (
        <Register
          // Передаем флаг open, чтобы модалка знала, что она открыта
          open={isRegisterModalOpen}
          Link={() => isLoginModalOpen(true)}
          // Передаем функцию для закрытия
          onClose={() => setIsRegisterModalOpen(false)}
        />
      )}

      {isLoginModalOpen && (
        <Login
          // Передаем флаг open, чтобы модалка знала, что она открыта
          open={isLoginModalOpen}
          // Передаем функцию для закрытия
          onClose={() => setIsLoginModalOpen(false)}
        />
      )}

      {(!isRegisterModalOpen, !isLoginModalOpen) && (
        <>
          <Categories />
          <Slider />
          <AllCategories />

          <main>
            <Outlet />
          </main>
        </>
      )}





      {/* <Outlet /> — это "дырка", в которую react-router-dom 
        вставляет текущий дочерний компонент (Home, Categories, Slider)
      */}


      {/* Если будет Footer, он тоже пойдет здесь */}
    </div>
  );
}