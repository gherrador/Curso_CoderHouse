const mongoose = require('mongoose');
const { MONGO_URI, FAKE_SERVER } = require("./global");

exports.getConnection = () => {    
    mongoose.connect(MONGO_URI, {
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