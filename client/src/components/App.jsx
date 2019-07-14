import React, { Component } from 'react';
import axios from 'axios';

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
      colors: [],
      showShippingOptions: false
    }
    this.fetchProduct = this.fetchProduct.bind(this);
    this.updateMainImg = this.updateMainImg.bind(this);
    this.handleSelectedColor = this.handleSelectedColor.bind(this);
    this.handleAddToCart = this.handleAddToCart.bind(this);
    this.shippingOptions = this.shippingOptions.bind(this);
    this.handleFileUpload = this.handleFileUpload.bind(this);
    this.showCartModal = this.showCartModal.bind(this);
    this.closeCartModal = this.closeCartModal.bind(this);
  }

  componentDidMount() {
    this.fetchProduct()
  }

  fetchProduct() {
    // let id = Math.floor(Math.Random() * (19) + 1);
    let id = 0;
    axios
    .get(`/api/product/${id}`)
    .then(({data}) => {
      this.setState({ 
        product : data[0],
        mainImage: data[0].imageDefault,
        images: data[0].images,
        gallery: data[0].gallery,
        colors: data[0].colors
      }, () => {
        console.log(data)
      });
    })
    .catch(err => console.error(err));
  }

  updateMainImg(selectedImage) {
    this.setState({ mainImage: selectedImage })
  }

  handleSelectedColor(e) {
    let imgs = document.getElementsByClassName('carousel-image-selected');
    let colors = document.getElementsByClassName('colorImg-selected');
    let selectedColor = e.target;

    this.setState({
      selectedColor: this.state.colors[e.target.id].name, 
      showShippingOptions: true,
      makeSelection: false
    });
    this.updateMainImg(this.state.colors[e.target.id].image);
    // remove borders from carousel and add border to selected color
    if (imgs.length) {
      imgs[0].className = "carousel-image"
    }

    if (colors.length) {
      colors[0].className = "colorImg";
      selectedColor.className = "colorImg-selected";
    } else {
      selectedColor.className = "colorImg-selected";
    }
  }

  shippingOptions() {
    return (
      <div id="receive-method">
        <h3>Shipping Options</h3>
        <div className="receive-method-option">
          <input className="radio" type="radio" name="drone" checked />
          <label>Ship This Item</label>
        </div>

        <div className="receive-method-option">
          <input className="radio" type="radio" name="drone" />
          <label>Free Pick Up In Store</label>
        </div>
      </div>
    )
  }

  handleAddToCart(e) {
    if(!this.state.selectedColor) {
      this.setState({ makeSelection: true })
    } else {
      this.setState({ makeSelection: false })
      this.showCartModal();
    }    
  }

  showCartModal() {
    let modal = document.getElementById("cart-modal");
    modal.style.display = "block";
  }

  closeCartModal() {
    let modal = document.getElementById("cart-modal");
    modal.style.display = "none";
  }

  handleFileUpload() {
    //fileupload
  }

  render() {
    const reviewStyle = {
      fontSize: "11px",
      paddingBottom: "15px"
    };
    
    return (
      <div>
        <BreadCrumbs product={this.state.product}/>

        <div id="main">
          <div id="cart-modal" className="modal">
            <div className="cart-modal-content">
          
                <span className="close" onClick={this.closeCartModal}>&times;</span>
                <h3>ADDED TO SHOPPING CART</h3>

                <div className="cart-info">
                  <div id="cart-product-info">
                    <div>
                      <img className="cart-product-image" src={this.state.mainImage} />
                    </div>

                    <div className="cart-product-details">
                      <h4>{this.state.product.productName + ', ' + this.state.selectedColor}</h4>
                      <div id="sku">Item: 706774</div>
                      <div id="quantity">Quantity: 1</div>
                      <div id="price">Price: ${this.state.product.price}</div>
                    </div>
                  </div>
                  <div id="cart-details">
                    <div className="current-cart">Currently in Cart: 1 item</div>
                    <div>Total: ${this.state.product.price}</div>
                    <div>(Subtotal does not include shipping and processing, gift wrap, discounts or tax)</div>
                    <div className="addToCart right-subsets">
                      <div><button className="continue-btn" onClick={this.closeCartModal}>Continue Shopping</button></div>
                      <div><button className="cart-modal-btn" onClick={this.handleAddToCart}>Checkout</button></div>
                      <div><button className="cart-modal-btn" onClick={this.handleAddToCart}>Express Checkout</button></div>
                    </div>
                    <div className="review" style={reviewStyle}>You’ll still have a chance to review your order.</div>
                  </div>
                </div>
      
              <div className="cart-bottom">
                <h2>WE THOUGHT YOU'D ALSO LOVE...</h2>
                <img src="https://imgur.com/0LT6gvi.jpg"/>
              </div>
            </div>
          </div>

          <div className="left">
          <ImageZoom productName={this.state.product.productName} smallImage={this.state.mainImage} largeImage={this.state.mainImage} className="zoom"/>

            {/*<div className="product-image">
              {this.state.favorite ? this.favorite() : this.unfavorite()}
              <ImageZoom productName={this.state.product.productName} smallImage={this.state.mainImage} largeImage={this.state.mainImage} className="zoom"/>
              <div className="image-tools">
                <a className="larger-text">View Larger</a>
                <span className="zoom-text"> Roll Over Image To Zoom</span>
              </div>
            </div>*/}
            
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
              {/*<p className="color-select">HAVE A QUESTION?</p>
              <p className="grade right-subsets">Contract Grade</p> */}
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
              <div className="right-subsets">
                <label><abbr className="color-select">QTY</abbr></label>
                <div><input className="qty-input" type="number" placeholder="QTY"/></div>
              </div>
              
              {this.state.showShippingOptions ? this.shippingOptions() : null}

              <div>
                <a className="swatches right-subsets" href="">Request Free Swatches</a>
              </div>

              <div className="right-subsets">
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