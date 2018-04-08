module.exports = app => {
  const mongoose = app.mongoose

  const CommentSchema = new mongoose.Schema({
    content: { type: String },
    owner_user_id: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    target_user_id: {type:mongoose.Schema.Types.ObjectId, ref: 'User' },
    likeCount: {type: String},
    dislikeCount: {type: String},
    commentCount: {type: String},
    createdAt: { type: Date, default: Date.now }
  })
  return mongoose.model('Comment',CommentSchema)
}