import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import '../App.css';
import Card from './Card';

const CategoryRow = ({ title, items }) => {
  return (
    <div className="category-row-container">
      <h2 className="category-title">{title}</h2>
      <Swiper
        spaceBetween={10}
        slidesPerView={'auto'}
        loop={true}
        navigation
      >
        {items.map((item, index) => (
          <SwiperSlide key={index} style={{ width: 'auto' }}>
            <Card title={item.title} imageUrl={item.imageUrl} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CategoryRow;
