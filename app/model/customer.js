export default function (app) {
    const mongoose = app.mongoose;
    const CustomerSchema = new mongoose.Schema({
      nickname: {type: String,  required: true},  
      mobile: { type: String, unique: true, required: true },
      email: { type: String, required: true },
      age: {type: Number, required: true},
      sex: {type: String, required: true},
      birthday: {type: Date, required: true},
      address: {type: String, required: true},
      company: {type: String, required: true},
      realName: { type: String, required: true },
      source: {type: String, required: true},
      avatar: { type: String, default: 'https://1.gravatar.com/avatar/a3e54af3cb6e157e496ae430aed4f4a3?s=96&d=mm' },
      record: { type: mongoose.Schema.Types.ObjectId, ref: 'Record' },
      createdAt: { type: Date, default: Date.now }
    });
    return mongoose.model('Customer', CustomerSchema);
  }
  