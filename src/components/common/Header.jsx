import React from "react";

export default function Header({
  openUserMenu,
  onAdminClick,
  allClose,
  isLoggedIn,
  user,
  onLogout,
  isAdmin
}) {
  const username = isLoggedIn && user ? user.name || user.email : "Кабинет";

  return (
    <header className="mx-30">
      <div className="bg-white px-10 pt-10 pb-4 rounded-b-2xl">
        {/* Верхняя строка */}
        <div className="flex items-center gap-4 justify-between">
          <div className="flex gap-2 text-sm text-gray-600">
            <div className="flex gap-2">
              <img src="./phone icon.svg" alt="" />
              <span className="font-medium">8 702 701 5075</span>
            </div>
            <div className="flex gap-2">
              <img src="./email icon.svg" alt="" />
              <span className="font-medium">info@maldex.ru</span>
            </div>
            <div className="flex gap-2">
              <img src="./geo icon.svg" alt="" />
              <span className="font-medium">Almaty</span>
            </div>
          </div>

          <div className="text-sm text-gray-600">
            <p className="font-medium">Мин. сумма заказа от 30 тыс рублей</p>
          </div>

          <div className="flex gap-4 text-sm text-gray-600">
            <p className="font-medium cursor-pointer">Доставка</p>
            <p className="font-medium cursor-pointer">Оплата</p>
            <p className="font-medium cursor-pointer">Контакты</p>
          </div>
        </div>

        {/* Нижняя строка */}
        <div className="flex items-center gap-4 py-6">
          <div>
            <img
              onClick={allClose}
              src="./Maldex logo.svg"
              alt="Maldex Logo"
              className="cursor-pointer"
            />
          </div>

          <button className="flex items-center gap-2 bg-[#EC1026] px-6 py-3 rounded-xl justify-center transition hover:bg-red-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-white"
            >
              <rect x="3" y="3" width="7" height="9" rx="1" />
              <rect x="14" y="3" width="7" height="5" rx="1" />
              <rect x="14" y="12" width="7" height="9" rx="1" />
              <rect x="3" y="16" width="7" height="5" rx="1" />
            </svg>
            <p className="font-medium text-white">Каталог</p>
          </button>

          <div className="flex-grow">
            <div className="flex items-stretch w-full my-10 border-2 border-red-600 rounded-lg overflow-hidden relative">
              <input
                type="text"
                placeholder="Поиск"
                className="flex-grow px-4 py-2 text-base outline-none bg-transparent"
              />
              <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-8 transition-colors duration-300">
                Найти
              </button>
            </div>
          </div>

          {/* Иконки справа */}
          <div className="flex items-center gap-6 cursor-pointer text-sm">
            <div className="flex flex-col items-center hover:text-red-600 transition">
              <img src="./heart.svg" alt="" />
              <p className="font-medium">Избранное</p>
            </div>

            {/* Кабинет */}
            <div
              onClick={() => {
                if (!isLoggedIn) openUserMenu();
                else if (isAdmin) onAdminClick();
                else openUserMenu();
              }}
              className="flex flex-col items-center hover:text-red-600 transition"
            >
              <img src="./union.svg" alt="" />
              <p className="font-medium">{username}</p>
            </div>

            <div className="flex flex-col items-center hover:text-red-600 transition">
              <img src="./korz.svg" alt="" />
              <p className="text-[#F1107E] font-medium">14 619 ₽</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
