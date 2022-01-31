const mongoose = require('mongoose');
const Campground = require('../models/campgrounds');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/yelp-camp';

mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, 'connection error'));
db.once("open", () => {
    console.log('db connected');
});

// gets random element from array
const sample = (arr) => {
    return arr[Math.floor(Math.random() * arr.length)];
};

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const rand1000 = Math.floor(Math.random() * 1000);
        const randPrice = Math.floor(Math.random() * 50) + 10;
        const camp = new Campground({
            author: "60025fa66c7b2c0015814cf8",
            location: `${cities[rand1000].city}, ${cities[rand1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            images: [
                {
                    url: 'https://res.cloudinary.com/djuiubmeb/image/upload/v1610133770/YelpCamp/ztu6axrtnhtkv2riyq64.jpg',
                    filename: 'YelpCamp/gg71up21ghqfqg9lpvvi'
                },
                {
                    url: 'https://res.cloudinary.com/djuiubmeb/image/upload/v1643519243/YelpCamp/b04hbaz0lsnkd4ci45kd.jpg',
                    filename: 'YelpCamp/kqffzro5fqb498bmaupm'
                },
                {
                    url: 'https://res.cloudinary.com/djuiubmeb/image/upload/v1610582368/YelpCamp/oag85esfg2f5oy1s6ali.jpg',
                    filename: 'YelpCamp/dbfawobmb26apgmadj6p'
                }
            ],
            description: 'Lorem ipsum, dolor sit ssssamet consectetur adipisicing elit. Molestiae error sequi labore quo doloremque? Quis incidunt vel dolorem optio, similique at ratione, amet doloribus asperiores earum hic distinctio ea porro!',
            price: randPrice,
            geometry: {
                coordinates: [cities[rand1000].longitude, cities[rand1000].latitude],
                type: "Point"
            }
        });
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})