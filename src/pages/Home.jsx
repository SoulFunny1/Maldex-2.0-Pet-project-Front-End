import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules"; 
import "swiper/css";
import "swiper/css/pagination";

import styles from "./Home.module.css";
import banner from "../assets/sliderHomePage.png"; // проверь путь

// Исходный массив данных
const initialCategories = [
    { name: "Одежда" },
    { name: "Сумки, портфели, рюкзаки" },
    { name: "Ручки" },
    { name: "Кухня и бар" },
    { name: "Гаджеты" },
    { name: "Новый год и Рождество" },
];

export default function CategoryNav() {
    const [activeIndex, setActiveIndex] = useState(0);

    const handleClick = (index) => {
        setActiveIndex(index);

        console.log(`Выбрана категория: ${initialCategories[index].name}`);
    };

    return (
        <div className="bg-white rounded-xl mx-30 p-5">
            <div className='pb-5'>
                <p className='text-[35px] text-[#00B6BA] font-semibold'>hits!</p>
            </div>
            <div className='border-1 border-gray-300 rounded-lg p-3'>


                <div className="flex justify-between items-center">
                    <nav className="flex items-center space-x-6">
                        {initialCategories.map((item, index) => {
                            const isActive = index === activeIndex;

                            return (
                                <div
                                    key={index}
                                    onClick={() => handleClick(index)}
                                    className="relative pb-2 cursor-pointer group"
                                >
                                    <span
                                        className={`text-sm whitespace-nowrap transition duration-200 ${isActive
                                            ? 'text-red-500 font-bold'
                                            : 'text-gray-600 hover:text-gray-800'
                                            }`}
                                    >
                                        {item.name.toUpperCase()}
                                    </span>
                                    {isActive && (
                                        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-red-500"></div>
                                    )}
                                    {!isActive && (
                                        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-red-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                                    )}
                                </div>
                            );
                        })}
                    </nav>
                    <button
                        className="ml-auto px-4 py-2 border border-red-500 text-red-500 text-sm font-semibold rounded-lg hover:bg-red-50 transition duration-200"
                    >
                        ВСЕ ТОП-ТОВАРЫ
                    </button>
                </div>
            </div>
            <div className="pt-5 pb-5">
                <Swiper 
                    pagination={{ clickable: true }}
                    modules={[Pagination]}
                    className={styles["swiper-container"]}
                    spaceBetween={0}
                    slidesPerView={1}   
                >
                    <SwiperSlide className={styles.swiperslide}>
                        <img src={banner} alt="banner" />
                    </SwiperSlide>
                    <SwiperSlide className={styles.swiperslide}>
                        <img src={banner} alt="banner" />
                    </SwiperSlide>
                    <SwiperSlide className={styles.swiperslide}>
                        <img src={banner} alt="banner" />
                    </SwiperSlide>
                </Swiper>
            </div>
            
        </div>
    );
}