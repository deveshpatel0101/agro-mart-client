const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB || 'mongodb://localhost:27017/my_blog').then(() => {
    console.log('Connected to Database.');
}).catch(err => {
    console.log('Something went wrong while connecting to database', err);
});

mongoose.Promise = global.Promise;

module.exports = mongoose;