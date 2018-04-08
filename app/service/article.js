const Service = require('egg').Service

class ArticleService extends Service {
  // create======================================================================================================>
  async create(payload) {
    return this.ctx.model.Article.create(payload)
  }

  // destroy======================================================================================================>
  async destroy(_id) {
    const { ctx, service } = this
    const article = await ctx.service.article.find(_id)
    if (!article) {
      ctx.throw(404, '文章不存在')
    }
    return ctx.model.Article.findByIdAndRemove(_id)
  }

  // update======================================================================================================>
  async update(_id, payload) {
    const { ctx, service } = this
    const article = await ctx.service.article.find(_id)
    if (!article) {
      ctx.throw(404, '文章不存在')
    }
    return ctx.model.Article.findByIdAndUpdate(_id, payload)
  }

  // show======================================================================================================>
  async show(_id) {
    const article = await this.ctx.service.article.find(_id)
    if (!article) {
      this.ctx.throw(404, '文章不存在')
    }
    return this.ctx.model.Article.findById(_id)
  }

  // index======================================================================================================>
  async index(payload) {
    const { currentPage, pageSize, isPaging, search } = payload
    let res = []
    let count = 0
    let skip = ((Number(currentPage)) - 1) * Number(pageSize || 10)
    if(isPaging) {
      if(search) {
        res = await this.ctx.model.Article.find({name: { $regex: search } }).skip(skip).limit(Number(pageSize)).sort({ createdAt: -1 }).exec()
        count = res.length
      } else {
        res = await this.ctx.model.Article.find({}).skip(skip).limit(Number(pageSize)).sort({ createdAt: -1 }).exec()
        count = await this.ctx.model.Article.count({}).exec()
      }
    } else {
      if(search) {
        res = await this.ctx.model.Article.find({name: { $regex: search } }).sort({ createdAt: -1 }).exec()
        count = res.length
      } else {
        res = await this.ctx.model.Article.find({}).sort({ createdAt: -1 }).exec()
        count = await this.ctx.model.Article.count({}).exec()
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
    return this.ctx.model.Article.remove({ _id: { $in: values } })
  }

  // Commons======================================================================================================>
  async find(id) {
    return this.ctx.model.Article.findById(id)
  }

}

module.exports = ArticleService