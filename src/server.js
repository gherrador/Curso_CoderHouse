const express = require("express");
const app = express();
const routes = require('./routes/routes')
const router = express.Router()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes(router))
module.exports = app;