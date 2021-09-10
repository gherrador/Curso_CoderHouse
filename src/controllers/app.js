const mongoose = require('mongoose');
const path = require('path')
const { MONGO_URI } = require(path.join(__dirname, '../../config/global'));

exports.getConnection = async() => {
    try {
        mongoose.set("useCreateIndex", true);
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        return console.log('Database connected successfully')
    } catch {
        return console.log('Failed to connect to database')
    }
}
