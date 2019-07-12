import React, { Component } from 'react';
import Swiper from 'react-id-swiper';

export default class Carousel extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    let selectedImage = e.target.src;
    let el = e.target
    let imgs = document.getElementsByClassName('carousel-image-selected');
    if (imgs.length) {
      imgs[0].className = "carousel-image"
      el.className = "carousel-image-selected";
    } else {
      el.className = "carousel-image-selected";
    }
    this.props.updateMainImg(selectedImage);
  }

  render () {
    const params = {
      noSwiping: true,
      slidesPerView: 5.5,
      spaceBetween: 5,
      pagination: {
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }
    };

    return this.props.images.length  > 0  ? (
      <Swiper {...params}>
        {this.props.images.map((image, key) => (
          <div key={key} >
            <img onClick={this.handleClick} className="carousel-image" src={image} />
          </div>
        ))}
      </Swiper>
    ) : null; 
  }
};