const mongoose = require('mongoose')

before(async () => {
  mongoose.connect('mongodb://localhost/muber_test')
  await new Promise(resolve => {
    mongoose.connection.once('open', resolve).on('error', err => console.log('Warning: ', err))
  })
})

beforeEach(async () => {
  const { drivers } = mongoose.connection.collections
  try {
    await drivers.drop()
  } catch (error) {}
})
