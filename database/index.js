var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/carousel',  { useNewUrlParser: true });

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to database')
});

var productSchema = new mongoose.Schema({
  id: Number,
  productName: String,
  type: String,
  imageDefault: String,
  images: [],
  colors: [{name: String, url: String, image: String}],
  price: Number,
  gallery: []
});

var gallerySchema = new mongoose.Schema({
  id: Number,
  productName: String,
  gallery: []
});

var Product = mongoose.model('product', productSchema);
var Gallery = mongoose.model('gallery', gallerySchema);

module.exports = { Product, Gallery };