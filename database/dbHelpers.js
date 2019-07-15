const Product = require('./index.js');

const get = (id) => {
  return Product.find({ id });
}

module.exports = { get };