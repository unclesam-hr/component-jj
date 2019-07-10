const Products = require('./index.js');

const get = () => {
  return Products.find({});
}

module.exports = { get };