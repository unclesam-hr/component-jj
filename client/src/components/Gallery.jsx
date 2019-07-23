import React, { Component } from 'react';
import Swiper from 'react-id-swiper';

export default Gallery = ({ gallery }) => {
  const params = {
    noSwiping: true,
    slidesPerView: 3,
    spaceBetween: 10,
    pagination: {
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    }
  } 

  return this.props.gallery.length  > 0  ? (
    <Swiper {...params}>
      {gallery.map((image, key) => (
        <div key={key}>
          <img className="gallery-image" src={image} />
        </div>
      ))}
    </Swiper>
  ) : null; 
}