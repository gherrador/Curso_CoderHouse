const mongoose = require('mongoose');
const path = require('path')
const { MONGO_URI } = require("../../config/global");

exports.getConnection = async() => {

    await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,

            useUnifiedTopology: true,

        })
        .then(() => {
            console.log('Database connected')
        }).catch(err => {
            console.error(err)
        })
}