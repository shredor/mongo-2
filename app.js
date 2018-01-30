const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
mongoose.Promise = global.Promise

if (process.env.NODE_ENV !== 'test') {
  mongoose.connect('mongodb://localhost/muber')
}

const routes = require('./routes/routes')
const app = express()

app.use(bodyParser.json())
routes(app)

module.exports = app
