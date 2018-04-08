module.exports = app => {
  const mongoose = app.mongoose
  const CustomerSchema = new mongoose.Schema({
    nickname: {type: String,  required: true},  
    mobile: { type: String, unique: true, required: true },
    email: { type: String },
    age: {type: Number},
    sex: {type: String},
    birthday: {type: Date},
    address: {type: String},
    company: {type: String},
    realName: { type: String },
    source: {type: String},
    record: { type: mongoose.Schema.Types.ObjectId, ref: 'Record' },
    createdAt: { type: Date, default: Date.now }
  })
  return mongoose.model('Customer', CustomerSchema)
}
  