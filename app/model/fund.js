module.exports = app => {
  const mongoose = app.mongoose
  const FundsSchema = new mongoose.Schema({
    title: { type: String, unique: true, required: true },
    intro: { type: String},
    content:{type: String},
    author: {type: String},
    extra: { type: mongoose.Schema.Types.Mixed },
    createdAt: { type: Date, default: Date.now }
  })

  return mongoose.model('Role',FundsSchema)
}