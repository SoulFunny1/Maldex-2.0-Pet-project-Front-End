import React, { useState, useEffect } from 'react';



// const categories = [
//   { name: 'Наборы', icon: './fastC1.svg' },
//   { name: 'Идеи подарков', icon: './fastC2.svg' },
//   { name: 'На праздники', icon: './fastC3.svg' },
//   { name: 'Новинки', icon: './fastC4.svg' },
//   { name: 'Одежда', icon: './fastC5.svg' },
//   { name: 'Тренды сезона', icon: './fastC6.svg' },
//   { name: 'Головные уборы', icon: './fastC7.svg' },
//   { name: 'Наборы', icon: './fastC1.svg' },
//   { name: 'Электроника', icon: './fastC2.svg' },
//   { name: 'Бутылки', icon: './fastC3.svg' },
//   { name: 'Уникальный дизайн', icon: './fastC4.svg' },
// ];

const CategoryList = () => {
  const [Fcategories, setFCategories] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/api/fastCategories/')
      .then(response => response.json())
      .then(data => setFCategories(data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div className="flex justify-center  items-center">
      <div className="flex gap-17 p-4 scrollbar-hide lg:justify-center">
        {Fcategories.map((category, index) => (
          <div key={index} className="w-[102px] flex flex-col items-center text-center cursor-pointer">
            {/* Блок с иконкой */}
            <div className="w-35 h-35 flex items-center justify-center p-2 mb-2 rounded-2xl bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
              <img src={category.icon} className="w-16 h-16"/>
            </div>
            {/* Текст категории под блоком */}
            <p className="text-sm text-gray-700 font-medium whitespace-nowrap  text-ellipsis">
              {category.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;