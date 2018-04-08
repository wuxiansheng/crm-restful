const Service = require('egg').Service
class CustomerService extends Service {
  // create======================================================================================================>
  async create(_id,payload) {
    const { ctx, service } = this
    const mobile = await ctx.service.customer.find(_id)
    if (!mobile) {
      ctx.throw(404, '手机号码已经存在')
    }
    return this.ctx.model.Customer.create(payload)
  }
  // destroy======================================================================================================>
  async destroy(_id) {
    const { ctx, service } = this
    const customer = await ctx.service.customer.find(_id)
    if (!customer) {
      ctx.throw(404, '客户不存在')
    }
    return ctx.model.Customer.findByIdAndRemove(_id)
  }
  // update======================================================================================================>
  async update(_id, payload) {
    const { ctx, service } = this
    const customer = await ctx.service.article.find(_id)
    if (!customer) {
      ctx.throw(404, '客户不存在')
    }
    return ctx.model.Customer.findByIdAndUpdate(_id, payload)
  }

  // show======================================================================================================>
  async show(_id) {
    const customer = await this.ctx.service.article.find(_id)
    if (!customer) {
      this.ctx.throw(404, '客户不存在')
    }
    return this.ctx.model.Customer.findById(_id)
  }

  // index======================================================================================================>
  async index(payload) {
    const { currentPage, pageSize, isPaging, search } = payload
    let res = []
    let count = 0
    let skip = ((Number(currentPage)) - 1) * Number(pageSize || 10)
    if(isPaging) {
      if(search) {
        res = await this.ctx.model.Customer.find({name: { $regex: search } }).skip(skip).limit(Number(pageSize)).sort({ createdAt: -1 }).exec()
        count = res.length
      } else {
        res = await this.ctx.model.Customer.find({}).skip(skip).limit(Number(pageSize)).sort({ createdAt: -1 }).exec()
        count = await this.ctx.model.Customer.count({}).exec()
      }
    } else {
      if(search) {
        res = await this.ctx.model.Customer.find({name: { $regex: search } }).sort({ createdAt: -1 }).exec()
        count = res.length
      } else {
        res = await this.ctx.model.Customer.find({}).sort({ createdAt: -1 }).exec()
        count = await this.ctx.model.Customer.count({}).exec()
      }
    }
    // 整理数据源 -> Ant Design Pro
    let data = res.map((e,i) => {
      const jsonObject = Object.assign({}, e._doc)
      jsonObject.key = i
      jsonObject.createdAt = this.ctx.helper.formatTime(e.createdAt)
      return jsonObject
    })

    return { count: count, list: data, pageSize: Number(pageSize), currentPage: Number(currentPage) }
  }

  // removes======================================================================================================>
  async removes(values) {
    return this.ctx.model.Customer.remove({ _id: { $in: values } })
  }

  // Commons======================================================================================================>
  async find(id) {
    return this.ctx.model.Customer.findById(id)
  }

}

module.exports = CustomerService