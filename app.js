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
app.use((err, req, res, next) => {
  if (err.message === 'Not found') {
    res.status(404)
    res.send(err.message)
  }

  switch (err.name) {
    case 'ValidationError':
      res.status(422)
      res.send(
        Object.entries(err.errors).reduce((sum, [field, fieldErr]) => ({ ...sum, [field]: fieldErr.message }), {})
      )
      break
    default:
      res.status(500)
      res.send(err.message)
  }
})

module.exports = app
