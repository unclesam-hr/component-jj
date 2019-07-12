const mongoose = require('mongoose');
const Product = require('../database/index.js');

const data = [
  {
    id: 0,
    productName: 'Auburn Chair',
    type: 'Living Room Chairs',
    imageDefault: 'https://imgur.com/ulsIIVf.jpg',
    images: ['https://imgur.com/ulsIIVf.jpg', 'https://imgur.com/J3BaLPZ.jpg', 'https://imgur.com/QrQgjn6.jpg', 'https://imgur.com/46Wn7UH.jpg', 'https://imgur.com/TMegc87.jpg', 'https://imgur.com/dZa2N73.jpg', 'https://imgur.com/GHroeUC.jpg', 'https://imgur.com/Tz2ziYA.jpg', 'https://imgur.com/6fJfgMT.jpg', 'https://imgur.com/S2lb3bB.jpg', 'https://imgur.com/lHh19gf.jpg', 'https://imgur.com/cF1pOxE.jpg', 'https://imgur.com/E6pVwxK.jpg', 'https://imgur.com/JJAlXnO.jpg', 'https://imgur.com/wpt4mlb.jpg'],
    colors: [{name: 'Twill, Black Indigo', url: 'https://imgur.com/lpn3a56.jpg', image: 'https://imgur.com/cF1pOxE.jpg'}, {name: 'Distressed Velvet, Light Pink', url: 'https://imgur.com/BEvCH2O.jpg', image: 'https://imgur.com/TMegc87.jpg'}, {name: 'Twill, Platinum', url: 'https://imgur.com/Xt0EzFS.jpg', image: 'https://imgur.com/Tz2ziYA.jpg'}, {name: 'Distressed Velvet, Olive', url: 'https://imgur.com/mbpY6F3.jpg', image: 'https://imgur.com/wpt4mlb.jpg'}],
    price: 349,
    gallery: ['https://i.imgur.com/7bhsMY3.jpg', 'https://i.imgur.com/iGbIKJD.jpg', 'https://i.imgur.com/USgnFaC.jpg', 'https://i.imgur.com/Srsyleh.jpg', 'https://i.imgur.com/UDrfhjJ.jpg', 'https://i.imgur.com/9E3WqkA.jpg']
  }
];

const seed = () => {
    Product.create(data)
    .then(() => {
        console.log('Database seeded!');
        mongoose.connection.close();
    })
    .catch(err => console.error(err));
}

const galleryData = [
  {
    id: 0,
    productName: 'Auburn Chair',
    gallery: ['https://i.imgur.com/7bhsMY3.jpg', 'https://i.imgur.com/iGbIKJD.jpg', 'https://i.imgur.com/USgnFaC.jpg', 'https://i.imgur.com/Srsyleh.jpg', 'https://i.imgur.com/UDrfhjJ.jpg', 'https://i.imgur.com/9E3WqkA.jpg']
  }
];

const seedGallery = () => {
    Gallery.create(galleryData)
    .then(() => {
        console.log('Database seeded!');
        mongoose.connection.close();
    })
    .catch( err => console.error(err));
}


seed();
seedGallery();