const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const app = express();
const connectDB = require('./db/db');
const cookieParser = require('cookie-parser');
const alumRoutes = require('./routes/alum.route');
const feedRoutes = require('./routes/feed.route');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

connectDB();

app.use(cors());

app.get('/', (req, res)=>{
    res.send('Hello dear');
})

app.use('/alum', alumRoutes);
app.use('/feed', feedRoutes);



module.exports = app;