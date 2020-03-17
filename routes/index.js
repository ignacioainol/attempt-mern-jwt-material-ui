const express = require('express');
const app = express();


app.use('/api/users', require('./users'));
app.use('/api/auth', require('./auth'));


module.exports = app;