export default function (app) {
    const mongoose = app.mongoose;
    const RecordSchema = new mongoose.Schema({
        content: { type: String, required: true },
        type: { type: String, required: true },
        address: { type: String, required: true},
        createdAt: { type: Date, default: Date.now }
    });
    return mongoose.model('Record', RecordSchema);
}