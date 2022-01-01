require('dotenv').config()

module.exports = {
    MONGO_URI: process.env.MONGO_URI,
    FACEBOOK_CLIENT_ID: process.env.FACEBOOK_CLIENT_ID,
    FACEBOOK_CLIENT_SECRET: process.env.FACEBOOK_CLIENT_SECRET,
    MONGO_URL: process.env.MONGO_URL,
    GMAIL_PASS: process.env.GMAIL_PASS,
    ACCOUNT_SID_TWILIO: process.env.ACCOUNT_SID_TWILIO,
    AUTHTOKEN_TWILIO: process.env.AUTHTOKEN_TWILIO,
    NODE_ENV: process.env.NODE_ENV
}