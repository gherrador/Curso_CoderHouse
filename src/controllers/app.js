const mongoose = require('mongoose');
const path = require('path')
const { MONGO_URI } = require(path.join(__dirname, '../../config/global'));

exports.getConnection = async() => {
    mongoose.set("useCreateIndex", true);
    await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        .then(() => {
            console.log('Database connected')
        }).catch(err => {
            console.error(err)
        })
}