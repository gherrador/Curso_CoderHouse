require('dotenv').config()

module.exports = {
    MONGO_URI: process.env.MONGO_URI,
    FACEBOOK_CLIENT_ID: process.env.FACEBOOK_CLIENT_ID,
    FACEBOOK_CLIENT_SECRET: process.env.FACEBOOK_CLIENT_SECRET
}