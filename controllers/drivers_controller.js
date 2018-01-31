const Driver = require('../models/driver')

module.exports = {
  greeting (req, res) {
    res.send({ hi: 'there' })
  },

  index (req, res, next) {
    const { lng, lat } = req.query

    Driver.find({
      'geometry.coordinates': {
        $nearSphere: {
          $geometry: {
            type: 'Point',
            coordinates: [lng, lat]
          },
          $maxDistance: 200000
        }
      }
    })
      .then(drivers => res.send(drivers))
      .catch(next)
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
