const express = require('express');
require('./config/database');
const app = express();

//set variables
app.set('port', process.env.PORT || 3005);

//middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//routes
app.use(require('./routes'));

app.listen(app.get('port'), () => {
    console.log(`Server running on port ${app.get('port')}`);
})