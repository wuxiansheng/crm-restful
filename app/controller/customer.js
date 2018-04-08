const Controller = require('egg').Controller
class CustomerController extends Controller {
  constructor(ctx) {
    super(ctx)
    this.CustomerCreate = {
      username: { type: 'string'},
      mobile: {type: 'string'}
    }
  }
  // 创建客户
  async create() {
    const { ctx, service } = this
    // 校验参数
    ctx.validate(this.CustomerCreate)
    // 组装参数
    const payload = ctx.request.body || {}
    // 调用 Service 进行业务处理
    const res = await service.customer.create(payload)
    // 设置响应内容和响应状态码
    ctx.helper.success({ctx, res})
  }

  // 删除单个客户信息
  async destroy() {
    const { ctx, service } = this
    // 校验参数
    const { id } = ctx.params
    // 调用 Service 进行业务处理
    await service.customer.destroy(id)
    // 设置响应内容和响应状态码
    ctx.helper.success({ctx})
  }

  // 修改顾客信息
  async update() {
    const { ctx, service } = this
    // 校验参数
    ctx.validate(this.ArticleCreate)
    // 组装参数
    const { id } = ctx.params
    const payload = ctx.request.body || {}
    // 调用 Service 进行业务处理
    await service.customer.update(id, payload)
    // 设置响应内容和响应状态码
    ctx.helper.success({ctx})
  }

  // 获取单个客户信息
  async show() {
    const { ctx, service } = this
    // 组装参数
    const { id } = ctx.params
    // 调用 Service 进行业务处理
    const res = await service.customer.show(id)
    // 设置响应内容和响应状态码
    ctx.helper.success({ctx, res})
  }

  // 获取所有顾客信息(分页/模糊)
  async index() {
    const { ctx, service } = this
    // 组装参数
    const payload = ctx.query
    // 调用 Service 进行业务处理
    const res = await service.customer.index(payload)
    // 设置响应内容和响应状态码
    ctx.helper.success({ctx, res})
  }

  // 删除所选顾客(条件id[])
  async removes() {
    const { ctx, service } = this
    // 组装参数
    // const payload = ctx.queries.id
    const { id } = ctx.request.body // {id: "5a452a44ab122b16a0231b42,5a452a3bab122b16a0231b41"}
    const payload = id.split(',') || []
    // 调用 Service 进行业务处理
    const result = await service.customer.removes(payload)
    // 设置响应内容和响应状态码
    ctx.helper.success({ctx})
  }

}

module.exports = CustomerController