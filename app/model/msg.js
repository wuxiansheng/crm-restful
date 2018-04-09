module.exports = app => {
  const mongoose = app.mongoose
  const MsgSchema = new mongoose.Schema({
    user_id: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    msg: {type: String, required: true},
    imgurl: {type: String},
    comment: {type:mongoose.Schema.Types.ObjectId, ref: 'Comment'},
    createdAt: {type: Date, default: Date.now}
  })
  return mongoose.model('Msg', MsgSchema)
}
