/* eslint-disable linebreak-style */
const Controller = require('egg').Controller

class HomeController extends Controller {
  async index() {
    this.ctx.body = `hi, this is crm RESTfulAPI!
    `
  }
}

module.exports = HomeController
