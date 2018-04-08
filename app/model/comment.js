export default function (app) {
    const mongoose = app.mongoose;
    const CommentSchema = new mongoose.Schema({
        owner_user_id: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        target_user_id: {type:mongoose.Schema.Types.ObjectId, ref: 'User' },
        content: { type: String, required: true },
        likeCount: {type: String},
        dislikeCount: {type: String},
        commentCount: {type: String},
        createdAt: { type: Date, default: Date.now }
    });
    return mongoose.model('content',CommentSchema);
}