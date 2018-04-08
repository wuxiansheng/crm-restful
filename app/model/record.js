module.exports = app => {
  const mongoose = app.mongoose
  const RecordSchema = new mongoose.Schema({
    content: { type: String, required: true },
    type: { type: String, required: true },
    address: { type: String},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'Customer'},
    createdAt: { type: Date, default: Date.now }
  })
  return mongoose.model('Record', RecordSchema)
}