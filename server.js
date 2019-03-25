const express = require('express');
const mongoose = require('mongoose');

const admin = require('./routes/api/admin');
const users = require('./routes/api/users');
const products = require('./routes/api/products');
const orders = require('./routes/api/orders');
const profile = require('./routes/api/profile');

const app = express();

// Database config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.get('/', (req, res) => res.send('Hello!'));

// Use Routes
app.use('/api/admin', admin);
app.use('/api/users', users);
app.use('/api/products', products);
app.use('/api/orders', orders);
app.use('/api/profile', profile);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
