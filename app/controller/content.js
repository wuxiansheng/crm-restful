const Controller = require('egg').Controller

class ArticleController extends Controller {
  constructor(ctx) {
    super(ctx)

    this.ArticleCreate = {
      title: { type: 'string'},
      intro: {type: 'string'},
      content:{type: 'string'}
    }

  }

  // 创建文章
  async create() {
    const { ctx, service } = this
    // 校验参数
    ctx.validate(this.ArticleCreate)
    // 组装参数
    const payload = ctx.request.body || {}
    // 调用 Service 进行业务处理
    const res = await service.article.create(payload)
    // 设置响应内容和响应状态码
    ctx.helper.success({ctx, res})
  }

  // 删除单个文章
  async destroy() {
    const { ctx, service } = this
    // 校验参数
    const { id } = ctx.params
    // 调用 Service 进行业务处理
    await service.article.destroy(id)
    // 设置响应内容和响应状态码
    ctx.helper.success({ctx})
  }

  // 修改文章
  async update() {
    const { ctx, service } = this
    // 校验参数
    ctx.validate(this.ArticleCreate)
    // 组装参数
    const { id } = ctx.params
    const payload = ctx.request.body || {}
    // 调用 Service 进行业务处理
    await service.article.update(id, payload)
    // 设置响应内容和响应状态码
    ctx.helper.success({ctx})
  }

  // 获取单个文章
  async show() {
    const { ctx, service } = this
    // 组装参数
    const { id } = ctx.params
    // 调用 Service 进行业务处理
    const res = await service.article.show(id)
    // 设置响应内容和响应状态码
    ctx.helper.success({ctx, res})
  }

  // 获取所有文章(分页/模糊)
  async index() {
    const { ctx, service } = this
    // 组装参数
    const payload = ctx.query
    // 调用 Service 进行业务处理
    const res = await service.role.index(payload)
    // 设置响应内容和响应状态码
    ctx.helper.success({ctx, res})
  }

  // 删除所选文章(条件id[])
  async removes() {
    const { ctx, service } = this
    // 组装参数
    // const payload = ctx.queries.id
    const { id } = ctx.request.body // {id: "5a452a44ab122b16a0231b42,5a452a3bab122b16a0231b41"}
    const payload = id.split(',') || []
    // 调用 Service 进行业务处理
    const result = await service.role.removes(payload)
    // 设置响应内容和响应状态码
    ctx.helper.success({ctx})
  }

}

module.exports =ArticleController