const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const methodOverride = require('method-override')
require('dotenv').config();
require('./db/db');

const app = express();
app.use('/uploads', express.static(__dirname + '/uploads'));

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride());
app.use(cors());

const users = require('./routes/api/users');
app.use('/api/users', users);
const cart = require('./routes/api/cart');
app.use('/api/cart', cart);
const order = require('./routes/api/order');
app.use('/api/order', order);
const products = require('./routes/api/products');
app.use('/api/products', products);
const payment = require('./routes/api/stripe');
app.use('/api/stripe', payment);

app.use(express.static(__dirname + '/../client/public'));

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Server started on port ${port}`));