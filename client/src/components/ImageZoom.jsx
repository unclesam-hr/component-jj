import React, { Component } from 'react';
import ReactImageMagnify from 'react-image-magnify';

export default class ImageZoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
    this.showModal = this.showModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
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
        <div className="modal-content">
          <span className="close" onClick={this.closeModal}>&times;</span>
          <p>{this.props.productName}</p>
          <img src={largeImage} />
        </div>
      </div>

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
      </div>
    );
  }
}