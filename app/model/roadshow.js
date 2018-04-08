module.exports = app => {
  const mongoose = app.mongoose
  const RoadshowSchema = new mongoose.Schema({
    rtitle: { type: String, unique: true, required: true },
    intro: { type: String },
    content: { type: String },
    time: {type: Date},
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    updateAt: { type: Date, default: Date.now },
    createdAt: { type: Date, default: Date.now }
  })
  return mongoose.model('Roadshow', RoadshowSchema)
}