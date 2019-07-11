import React, { Component } from 'react';
import axios from 'axios';

import BreadCrumbs from './BreadCrumbs';

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
      }, () => {
        console.log(data)
      });
    })
    .catch(err => console.error(err));
  }

  render() {
    return (
      <div>
        <BreadCrumbs product={this.state.product}/>
      </div>
     )
  }
}