import React, { Component } from 'react';
import Swiper from 'react-id-swiper';

export default class Gallery extends Component {
  handleClick(e, data) {
    let selectedImage = e.target.src;
    let el = e.target
    let imgs = document.getElementsByClassName('carousel-image-selected');
  }

  render () {
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
        {this.props.gallery.map((image, key) => (
          <div key={key}>
            <img className="gallery-image" src={image} />
          </div>
        ))}
      </Swiper>
    ) : null; 
  }
};