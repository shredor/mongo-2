const Driver = require('../models/driver')

module.exports = {
  greeting (req, res) {
    res.send({ hi: 'there' })
  },

  create (req, res, next) {
    const driverProps = req.body

    Driver.create(driverProps)
      .then(driver => res.send(driver))
      .catch(next)
  },

  edit (req, res, next) {
    const { id } = req.params
    const driverProps = req.body
    Driver.findByIdAndUpdate(id, driverProps, { new: true })
      .then(driver => res.send(driver))
      .catch(next)
  },

  delete (req, res, next) {
    const { id } = req.params
    Driver.findByIdAndRemove(id)
      .then(driver => {
        if (!driver) throw new Error('Not found')
        res.send(driver)
      })
      .catch(next)
  }
}
