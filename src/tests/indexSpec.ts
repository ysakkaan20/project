import express from 'express'
import routes from '../routes/index'
import supertest from 'supertest'
const app = express()

app.use('/api', routes)

describe('test the endpoint to check if it return with an image or no', function () {
  it('it should return with and "image/jpeg" content-type for sending a real numbers and real image name ', function (done) {
    supertest(app)
      .get('/api/images?name=fjord&width=150&height=150')
      .set('Accept', 'application/json')
      .expect('Content-Type', 'image/jpeg')
      .expect(200)
      .end(function (err) {
        if (err) {
          done.fail(err)
        } else {
          done()
        }
      })
  })
  it('it should return with and "application/json; charset=utf-8" content-type and 66 Content-Length  for error msg length ', function (done) {
    supertest(app)
      .get('/api/images?name=fjord&width=15x0&height=1520')
      .set('Accept', 'application/json')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect('Content-Length', '66')
      .expect(200)
      .end(function (err) {
        if (err) {
          done.fail(err)
        } else {
          done()
        }
      })
  })
  it('it should return with and "application/json; charset=utf-8" content-type and 66 Content-Length  for error msg length for bad image name', function (done) {
    supertest(app)
      .get('/api/images?name=image&width=150&height=1520')
      .set('Accept', 'application/json')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect('Content-Length', '50')
      .expect(200)
      .end(function (err) {
        if (err) {
          done.fail(err)
        } else {
          done()
        }
      })
  })
})
