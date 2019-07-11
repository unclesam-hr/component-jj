const Product = require('./index.js');

const get = () => {
  return Product.find({});
}

module.exports = { get };