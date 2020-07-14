const request = require('supertest')
const app = require('../src/app')

describe('Testing /contacts', () => {

  let contactId = ''

  it('should returns all list of contacts from database', async (done) => {
    const res = await request(app)
      .get('/contacts')
    expect(res.status).toEqual(200)
    done()
  })

  it('should save contact in database', async (done) => {
    const res = await request(app)
      .post('/contacts')
      .send({
        "name": {
          "first": "Harold",
          "last": "Gilkey"
        },
        "address": {
          "street": "8360 High Autumn Row",
          "city": "Cannon",
          "state": "Delaware",
          "zip": "452201"
        },
        "phone": [
          {
            "number": "302-611-9148",
            "type": "home"
          },
          {
            "number": "302-532-9427",
            "type": "mobile"
          }
        ],
        "email": "harold.gilkey@yahoo.com"
      })
    contactId = res.body._id
    expect(res.status).toEqual(201)
    done()
  })

  it('should returns specific contact from database', async (done) => {
    const res = await request(app)
      .get('/contacts/' + contactId)
    expect(res.status).toEqual(200)
    done()
  })

  it('should update contact in the database', async (done) => {
    const res = await request(app)
      .put('/contacts/' + contactId)
      .send({
        name: {
          first: 'Harold'
        },
        address: {
          street: '8360 High Autumn Row'
        }
      })
    expect(res.status).toEqual(200)
    done()
  })

  it('should complain about the invalid email and should return 403 status', async (done) => {
    const res = await request(app)
      .put('/contacts/' + contactId)
      .send({
        email: 'invalid@.com'
      })
    expect(res.status).toEqual(403)
    done()
  })

  it('should delete contact from the database', async (done) => {
    const res = await request(app)
      .delete('/contacts/' + contactId)
    expect(res.status).toEqual(200)
    done()
  })

  it('should get 404 contact not found status', async (done) => {
    const res = await request(app)
      .get('/contacts/' + contactId)
    expect(res.status).toEqual(404)
    done()
  })

})
