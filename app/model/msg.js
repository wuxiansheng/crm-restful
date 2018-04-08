module.exports = app => {
  const mongoose = app.mongoose
  const MsgSchema = new mongoose.Schema({
    msg: {type: String, required: true},
    imgurl: {type: String},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    comment: {type:mongoose.Schema.Types.ObjectId, ref: 'Comment'},
    createdAt: {type: Date, default: Date.now}
  })
  return mongoose.model('Msg', MsgSchema)
}
