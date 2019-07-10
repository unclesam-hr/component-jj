var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/carousel',  { useNewUrlParser: true });

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to database')
});

var productSchema = new mongoose.Schema({
  productName: String,
  type: String,
  imageDefault: String,
  images: [{name: String, urls: [String]}],
  colors: [{name: String, url: String}],
  price: Number
});

var Product = mongoose.model('product', productSchema);

module.exports = Product;