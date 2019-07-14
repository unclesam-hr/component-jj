const express = require('express');
const parser = require('body-parser');
const path = require('path');

const { get } = require('./controllers.js');

const app = express();
const port = 3000;

app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('/api/product/:id', get);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))