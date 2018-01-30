const assert = require('assert')
const request = require('supertest')
const mongoose = require('mongoose')
const app = require('../../app')

const Driver = mongoose.model('driver')

describe('Drivers controller', () => {
  it('Post to /api/drivers creates a new driver', async () => {
    const count = await Driver.count()
    await request(app)
      .post('/api/drivers')
      .send({ email: 'test@test.com' })
    const newCount = await Driver.count()
    assert(count + 1 === newCount)
  })
})
