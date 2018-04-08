/* eslint-disable no-undef */
'use strict'

const { app, assert,mock } = require('egg-mock/bootstrap')

describe('test/app/controller/home.test.js', () => {
  describe('Get/', () => {
    it('should status 200 amd get the body', () => {
      return app.httpRequest()
        .get('/')
        .expect(200)
        .expect('hello world')
    })
    it('should GET /', async () => {
      await app.httpRequest()
        .get('/')
        .expect(200)
        .expect('hello world')
      const result = await  app.httpRequest()
        .get('/')
        .expect(200)
        .expect('hello world')
    })
  })
})