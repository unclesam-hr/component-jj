import React, { Component } from 'react';
import ReactImageMagnify from 'react-image-magnify';
import { FaRegHeart, FaHeart } from 'react-icons/fa';

export default class ImageZoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favorite: false,
    }
    this.showModal = this.showModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.toggleFavorite = this.toggleFavorite.bind(this);
  }

  toggleFavorite(e) {
    this.setState({ favorite: !this.state.favorite });
  }

  favorite() {
    return (
      <span onClick={this.toggleFavorite} className="favorite"><FaHeart size={25} style={{color: 'red'}}/></span>
    )
  }

  unfavorite() {
    return (
      <span onClick={this.toggleFavorite} className="favorite"><FaRegHeart size={25} style={{color: 'red'}}/></span>
    )
  }

  showModal(e) {
    let modal = document.getElementById("image-modal");
    modal.style.display = "block";
  }

  closeModal(e) {
    let modal = document.getElementById("image-modal");
    modal.style.display = "none";
  }

  render() {
    const smallImage = this.props.smallImage || ''
    const largeImage = this.props.largeImage || ''
    return (
      <div className="fluid">

        <div id="image-modal" className="modal">
          <div className="modal-content" onClick={this.closeModal}>
            <span className="close" onClick={this.closeModal}>&times;</span>
            <p>{this.props.productName}</p>
            <img src={largeImage} />
          </div>
        </div>
        <div className="product-image">
        {this.state.favorite ? this.favorite() : this.unfavorite()}
          <div onClick={this.showModal} className="fluid-image-container">
            <ReactImageMagnify {...{
                enlargedImageContainerClassName: "enlargedImage",
                smallImage: {
                  alt: 'Wristwatch by Ted Baker London',
                  isFluidWidth: true,
                  src: smallImage,
                },
                largeImage: {
                  src: largeImage,
                  width: 1800,
                  height: 1800
                },
                enlargedImageContainerDimensions: {
                  width: 400,
                  height: 400
                },
                shouldUsePositiveSpaceLens: true,
                lensStyle: {
                  background: 'hsla(0, 0%, 100%, .3)',
                  border: '1px solid #ccc',
                }
              }} />
          </div>
          <div className="image-tools">
            <a onClick={this.showModal} className="larger-text">View Larger</a>
            <span className="zoom-text"> Roll Over Image To Zoom</span>
          </div>
        </div>
      </div>
    );
  }
}