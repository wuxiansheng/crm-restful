module.exports = app => {
  const mongoose = app.mongoose
  const PostSchema = new mongoose.Schema({
    title: { type: String, unique: true, required: true },
    content:{type: String},
    extra: { type: mongoose.Schema.Types.Mixed },
    createdAt: { type: Date, default: Date.now }
  })

  return mongoose.model('Role',PostSchema)
}