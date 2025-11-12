import React from "react";

export default function HelloUser({ user, onLogout }) {
  return (
    <div className="mx-30 pt-10 min-h-screen bg-gradient-to-br flex flex-col items-center font-sans relative overflow-hidden">
      {/* Украшение фона */}
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/white-diamond.png')]"></div>

      {/* Шапка */}
      <div className="w-full bg-white shadow-lg rounded-3xl py-6 px-10 flex justify-between items-center relative z-10">
        <h1 className="text-3xl font-bold text-red-600 tracking-wide drop-shadow-sm">
          Личный кабинет
        </h1>
        <button
          onClick={onLogout}
          className="bg-red-600 text-white px-6 py-2 rounded-xl font-semibold hover:bg-red-700 active:scale-95 transition-all duration-200 shadow-md"
        >
          Выйти
        </button>
      </div>

      {/* Основной блок */}
      <div className="mt-16 bg-white shadow-2xl rounded-3xl w-[90%] md:w-[600px] p-10 border border-gray-100 relative z-10 hover:shadow-red-200 transition-all duration-300">
        <h2 className="text-4xl font-semibold text-gray-800 text-center mb-4">
          Привет,{" "}
          <span className="text-red-600 font-bold">
            {user?.name || user?.email}
          </span>{" "}
          👋
        </h2>
        <p className="text-gray-500 text-center mb-10 leading-relaxed">
          Добро пожаловать в твой личный кабинет!  
          Здесь ты можешь просматривать свои заказы, изменять личные данные  
          и управлять профилем. Всё сделано с душой ❤️
        </p>

        {/* Информация о пользователе */}
        <div className="space-y-4 text-gray-700">
          <div className="flex justify-between border-b pb-2">
            <span className="font-medium">Имя:</span>
            <span>{user?.name || "Не указано"}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="font-medium">Email:</span>
            <span>{user?.email || "Не указано"}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="font-medium">Статус:</span>
            <span className="text-green-600 font-semibold">Пользователь</span>
          </div>
        </div>

        {/* Кнопки действий */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-red-600 text-white px-8 py-3 rounded-xl font-medium hover:bg-red-700 hover:scale-105 transition-all shadow-md">
            Мои заказы
          </button>

        </div>
      </div>

      {/* Подвал */}
      <footer className="mt-16 text-gray-500 text-sm tracking-wide z-10">
        © {new Date().getFullYear()} <span className="font-semibold text-red-600">Maldex</span> — дипломная работа <b>Akbar</b> 🎓
      </footer>
    </div>
  );
}
