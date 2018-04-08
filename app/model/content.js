export default function (app) {
    const mongoose = app.mongoose;
    const ContentSchema = new mongoose.Schema({
        content: { type: String, required: true },
        imgurl: {type: String},
        comment: {type:mongoose.Schema.Types.ObjectId, ref: 'Comment' },
        updatadAt: { type: Date, default: Date.now },
        createdAt: { type: Date, default: Date.now }
    });
    return mongoose.model('content', ContentSchema);
}