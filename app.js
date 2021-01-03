const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const Campground = require('./models/campgrounds')

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, 'connection error'));
db.once("open", () => {
    console.log('db connected');
})

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    res.render('home');
})

app.get('/campground', async (req, res) => {
    const camps = await Campground.find({});
    res.render('campgrounds/index', { camps });
})

app.listen(3000, () => {
    console.log('listening 3000');
})