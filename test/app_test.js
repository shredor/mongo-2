const assert = require('assert')
const request = require('supertest')
const app = require('../app')

describe('the express App', () => {
  it('handles a request to root route', done => {
    request(app)
      .get('/api')
      .end((err, response) => {
        assert(!err)
        assert(response.body.hi === 'there')
        done()
      })
  })
})
