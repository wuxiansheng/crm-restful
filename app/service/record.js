const Service = require('egg').Service
class RecordService extends Service {
  // create======================================================================================================>
  async create(payload) {
    return this.ctx.model.Record.create(payload)
  }

  // destroy======================================================================================================>
  async destroy(_id) {
    const { ctx, service } = this
    const record = await ctx.service.record.find(_id)
    if (!record) {
      ctx.throw(404, 'record not found')
    }
    return ctx.model.Record.findByIdAndRemove(_id)
  }

  // update======================================================================================================>
  async update(_id, payload) {
    const { ctx, service } = this
    const record = await ctx.service.record.find(_id)
    if (!record) {
      ctx.throw(404, 'role not found')
    }
    return ctx.model.Record.findByIdAndUpdate(_id, payload)
  }

  // show======================================================================================================>
  async show(_id) {
    const record = await this.ctx.service.record.find(_id)
    if (!record) {
      this.ctx.throw(404, 'record not found')
    }
    return this.ctx.model.Record.findById(_id)
  }

  // index======================================================================================================>
  async index(payload) {
    const { currentPage, pageSize, isPaging, search } = payload
    let res = []
    let count = 0
    let skip = ((Number(currentPage)) - 1) * Number(pageSize || 10)
    if(isPaging) {
      if(search) {
        res = await this.ctx.model.Record.find({name: { $regex: search } }).skip(skip).limit(Number(pageSize)).sort({ createdAt: -1 }).exec()
        count = res.length
      } else {
        res = await this.ctx.model.Record.find({}).skip(skip).limit(Number(pageSize)).sort({ createdAt: -1 }).exec()
        count = await this.ctx.model.Record.count({}).exec()
      }
    } else {
      if(search) {
        res = await this.ctx.model.Record.find({name: { $regex: search } }).sort({ createdAt: -1 }).exec()
        count = res.length
      } else {
        res = await this.ctx.model.Record.find({}).sort({ createdAt: -1 }).exec()
        count = await this.ctx.model.Record.count({}).exec()
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
    return this.ctx.model.Record.remove({ _id: { $in: values } })
  }
  // Commons======================================================================================================>
  async find(id) {
    return this.ctx.model.Record.findById(id)
  }
}

module.exports = RecordService