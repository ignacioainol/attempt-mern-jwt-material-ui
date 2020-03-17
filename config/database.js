const mongoose = require('mongoose');

require('dotenv').config();
//db config
const db = process.env.MONGO_DB;

//connect to mongo
mongoose.set('useNewUrlParser', true);
mongoose
    .connect(db, {
        useCreateIndex: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("Mongodb is connected"))
    .catch(err => {
        console.log(err);
    })