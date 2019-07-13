import React, { Component } from 'react';
import axios from 'axios';

import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { FiMail, FiPrinter } from 'react-icons/fi';

import BreadCrumbs from './BreadCrumbs';
import ImageZoom from './ImageZoom';
import Carousel from './Carousel';
import Gallery from './Gallery';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: [],
      mainImage: '',
      images: [],
      gallery: [],
      selectedColor: '',
      favorite: false,
      colors: [],
      showShippingOptions: false
    }

    this.fetchProduct = this.fetchProduct.bind(this);
    this.toggleFavorite = this.toggleFavorite.bind(this);
    this.updateMainImg = this.updateMainImg.bind(this);

  }

  componentDidMount() {
    this.fetchProduct()
  }

  fetchProduct() {
    // let id = Math.floor(Math.Random() * (100) + 1);
    axios
    .get('/api/product')
    .then(({data}) => {
      this.setState({ 
        product : data[0],
        mainImage: data[0].imageDefault,
        images: data[0].images,
        gallery: data[0].gallery,
        colors: data[0].colors
      });
    })
    .catch(err => console.error(err));
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

  updateMainImg(selectedImage) {
    this.setState({ mainImage: selectedImage })
  }

  render() {
    return (
      <div>
        <BreadCrumbs product={this.state.product}/>

        <div id="main">

          <div className="left">
            <div className="product-image">
              {this.state.favorite ? this.favorite() : this.unfavorite()}
              <ImageZoom productName={this.state.product.productName} smallImage={this.state.mainImage} largeImage={this.state.mainImage} className="zoom"/>
              <div className="image-tools">
                <a className="larger-text">View Larger</a>
                <span className="zoom-text"> Roll Over Image To Zoom</span>
              </div>
            </div>
            
            <div className="carousel">
              <Carousel updateMainImg={this.updateMainImg} images={this.state.images}/>
            </div>

            <div className="save-product">
              <FiMail size={20} />&#160;
              <span className="save-product-text space">Email</span>
              <FiPrinter size={20}/>&#160;
              <span className="save-product-text">Print</span>
            </div>

            <div className="gallery">
              <img className="at-logo" src="https://imgur.com/KXvJ9Co.jpg" />
              <a className="add-photos" onClick={this.handleFileUpload} href="">+ ADD YOUR OWN PHOTOS</a>
              <Gallery gallery={this.state.gallery}/>
            </div>

            <div className="social-media">
              <div className="fb-like fb" data-href="https://developers.facebook.com/docs/plugins/" data-width="" data-layout="button_count" data-action="like" data-size="small" data-show-faces="false" data-share="false"></div>
              <div className="twitter">
                <a className="twitter-share-button" href="https://twitter.com/intent/tweet" data-url="https://dev.twitter.com/web/tweet-button">Tweet</a>
              </div>
              <div className="pinterest">
                <a href="https://www.pinterest.com/pin/create/button/" data-pin-do="buttonBookmark"></a>
              </div>
            </div>
          </div>

          <div className="right">
            <div className="productDetails">
              <h1 className="product-name">{this.state.product.productName}</h1>
              <p className="color-select">HAVE A QUESTION?</p>
              <p className="grade right-subsets">Contract Grade</p>
              <div className="color">
                {this.state.makeSelection ? <div className="color-select-popup">Please make selections before adding to cart.</div> : null}
                <p className="color-select">PLEASE SELECT A COLOR:</p>
                <span className="selected-color">{this.state.selectedColor}</span>
                
                <div className="color-image">
                  {this.state.colors.map((color, key) => (
                    <img onClick={this.handleSelectedColor} className="colorImg" src={color.url} id={key} key={key}/>
                  ))}
                </div>

              </div>

              <div>
                <span className="price">${this.state.product.price}</span>
              </div>
              <div className="qty right-subsets">
                <label><abbr className="color-select">QTY</abbr></label>
                <div><input className="qty-input" type="number" placeholder="QTY"/></div>
              </div>
              
              {this.state.showShippingOptions ? this.shippingOptions() : null}

              <div>
                <a className="swatches right-subsets" href="">Request Free Swatches</a>
              </div>

              <div className="addToCart right-subsets">
                <div><button className="cart-btn" onClick={this.handleAddToCart}>Add To Cart</button></div>
                <div><button id="registry" className="cart-btn">Add To Registry</button></div>
                <img className="credit-img" src="https://i.imgur.com/gAgBJTU.jpg" />
              </div>
          
            </div>
          </div>
        </div>
      </div>
     )
  }
}