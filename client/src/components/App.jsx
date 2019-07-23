import React, { Component } from 'react';
import axios from 'axios';

import { FiMail, FiPrinter } from 'react-icons/fi';
import { TiSocialFacebookCircular, TiSocialInstagram } from 'react-icons/ti';

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
      showShippingOptions: false,
      upload: true,
      instagram: false,
      facebook: false,
      selectedShipOption: 'Ship This Item',
      showFileModal: false
    }
  }

  componentDidMount() {
    this.fetchProduct()
  }

  fetchProduct = () => {
    const id = Math.floor(Math.random() * (19) + 1);
    axios
      .get(`/api/product/${id}`)
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

  updateMainImg = (selectedImage) => {
    this.setState({ mainImage: selectedImage })
  }

  handleSelectedColor = (e) => {
    const imgs = document.getElementsByClassName('carousel-image-selected');
    const colors = document.getElementsByClassName('colorImg-selected');
    const selectedColor = e.target;

    this.setState({
      selectedColor: this.state.colors[e.target.id].name, 
      showShippingOptions: true,
      makeSelection: false
    });
    this.updateMainImg(this.state.colors[e.target.id].image);
    imgs.length ? imgs[0].className = "carousel-image" : null;
    if (colors.length) {
      colors[0].className = "colorImg";
      selectedColor.className = "colorImg-selected";
    } else {
      selectedColor.className = "colorImg-selected";
    }
  }

  handleShippingChange = (e) => {
    this.setState({ selectedShipOption: e.target.id })
  }

  shippingOptions() {
    return (
      <div id="receive-method">
        <h3>Shipping Options</h3>
        <div className="receive-method-option">
          <input className="radio" name="drone" id="ship" type="radio" onChange={this.handleShippingChange} checked />
          <label>Ship This Item</label>
          <div className="receive-extra"><strong className="in-stock">In Stock + Ready to Ship:</strong> Order now for delivery Jul. 19 - Jul. 23 to zip code: 90001</div>
        </div>
        <div className="receive-method-option">
          <input className="radio" name="drone" id="pick-up" type="radio" onChange={this.handleShippingChange} />
          <label>Free Pick Up In Store </label>
          <div className="not-available receive-extra">Not Available Near Florence-Graham, CA, USA</div>
          <div><a className="store-link receive-extra" href="">Choose a different store</a></div>
        </div>
      </div>
    )
  }

  handleAddToCart = (e) => {
    if(!this.state.selectedColor) {
      this.setState({ makeSelection: true })
    } else {
      this.setState({ makeSelection: false })
      this.showCartModal();
    }    
  }

  showCartModal = () => {
    const modal = document.getElementById("cart-modal");
    modal.style.display = "block";
  }

  closeCartModal = () => {
    const modal = document.getElementById("cart-modal");
    modal.style.display = "none";
  }

  handleFileUpload = (e) => {
    e.preventDefault();
    this.setState({ showFileModal: !this.state.showFileModal });
  }

  handleFileUploadClick = (e) => {
    const options = e.target.id;
    if(options === 'instagram') {
      this.setState({ upload: false, instagram: true, facebook: false });
    } else if(options === 'facebook') {
      this.setState({ upload: false, instagram: false, facebook: true });
    } else {
      this.setState({ upload: true, instagram: false, facebook: false });
    }
  }

  showUpload() {
    return (
      <div>
        <h2>DRAG & DROP</h2>
        <span>your content or browse files</span>
      </div>
    )
  }

  showInstagram() {
    return (
      <div>
        <button className="btn-center"><div><TiSocialInstagram size={20}/></div> <div>CONNECT TO INSTAGRAM</div></button>
      </div>
    )
  }

  showFacebook() {
    return (
      <div>
        <button className="btn-center"><div><TiSocialFacebookCircular size={20}/></div> <div>CONNECT TO FACEBOOK</div></button>
      </div>
    )
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
                <h3>WE THOUGHT YOU'D ALSO LOVE...</h3>
                <div className="related-container">
                  <div>
                    <img src="https://carousel-we.s3-us-west-1.amazonaws.com/misc/cart-gallery1.jpg" />
                    <br /><a className="related-name">Auburn Ottoman</a>
                    <strong>$99 - $129</strong>
                  </div>
                  <div>
                    <img src="https://carousel-we.s3-us-west-1.amazonaws.com/00/00.jpg" />
                    <br /><a className="related-name">Storm Painting</a>
                    <strong>$379</strong>
                  </div>
                  <div>
                    <img src="https://carousel-we.s3-us-west-1.amazonaws.com/00/00.jpg" />
                    <br /><a className="related-name">Tripod Table</a>
                    <strong>$125</strong>
                  </div>
                </div>
      
              </div>
            </div>
          </div>

          <div id="file-modal" className={this.state.showFileModal ? "show-modal" : "modal"}>
            <div className="modal-content">
                <span className="close" onClick={this.handleFileUpload}>&times;</span>
                <div id="file-modal-content">
                  <div className="file-tabs">
                    <h3>Select Your Content</h3>
                      <div className="tabs">
                        <button onClick={this.handleFileUploadClick} id="upload">Upload</button>
                        <button onClick={this.handleFileUploadClick} id="instagram">Instagram</button>
                        <button onClick={this.handleFileUploadClick} id="facebook">Facebook</button>
                      </div>
                      <div className="upload-content">
                        {this.state.upload ? this.showUpload() : null}
                        {this.state.instagram ? this.showInstagram() : null}
                        {this.state.facebook ? this.showFacebook() : null}
                      </div>
                  </div>
                 
                  <div id="file-edit">
                    <div><h3>Edit Content</h3></div>
                    <div className="file-edit-content">
                      <div>No content selected.</div>
                      <div>Add content to continue.</div>
                    </div>
                    <div className="filed-edit-btn"><button>Next</button></div>
                  </div>
                </div>
 
            </div>
          </div>

          <div className="left">
            <ImageZoom productName={this.state.product.productName} smallImage={this.state.mainImage} largeImage={this.state.mainImage} className="zoom"/>
            
            <div className="carousel">
              <Carousel updateMainImg={this.updateMainImg} images={this.state.images}/>
            </div>

            <div className="save-product">
              <div className="save-product-option">
                <FiMail size={20} />&#160;
                <span className="save-product-text space">Email</span>
              </div>
           
              <div className="save-product-option">
                <FiPrinter size={20}/>&#160;
                <span className="save-product-text">Print</span>
              </div>
            </div>

            <div className="gallery">
              <img className="at-logo" src="https://carousel-we.s3-us-west-1.amazonaws.com/misc/at-westelm-logo.jpg" />
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
                  <img className="credit-img" src="https://carousel-we.s3-us-west-1.amazonaws.com/misc/credit-rewards.jpg" />
              </div>
            </div>
          </div>
        </div>
      </div>
     )
  }
}