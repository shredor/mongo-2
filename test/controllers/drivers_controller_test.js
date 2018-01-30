const assert = require('assert')
const request = require('supertest')
const mongoose = require('mongoose')
const app = require('../../app')

const Driver = mongoose.model('driver')

describe('Drivers controller', () => {
  it('POST to /api/drivers creates a new driver', async () => {
    const count = await Driver.count()
    await request(app)
      .post('/api/drivers')
      .send({ email: 'test@test.com' })
    const newCount = await Driver.count()
    assert(count + 1 === newCount)
  })

  it('PUT to /api/drivers/:id edits an existing driver', async () => {
    const driver = await new Driver({ email: 'test2@test.com', driving: false }).save()

    const driverId = driver._id.toString()

    await request(app)
      .put(`/api/drivers/${driverId}`)
      .send({ driving: true })

    const { driving } = await Driver.findById(driverId).select('driving')

    assert(driving === true)
  })

  it('DELETE to /api/drivers/:id deletes an existing driver', async () => {
    const driver = await new Driver({ email: 'test2@test.com', driving: false }).save()

    const driverId = driver._id.toString()

    await request(app).delete(`/api/drivers/${driverId}`)

    const deletedDriver = await Driver.findById(driverId)

    assert(deletedDriver === null)
  })
})
