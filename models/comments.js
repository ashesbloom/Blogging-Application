const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    name:{type: String, required: true},
    content: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    blogId:{type: Schema.Types.ObjectId, ref: 'blogs', required: true},
    createdAt: { type: Date, default: Date.now },
    likes: [{ type: Schema.Types.ObjectId, ref: 'user' }],
    replies: [{ type: Schema.Types.ObjectId, ref: 'comments' }],
    parent: { type: Boolean, default: true }
}, { timestamps: true });

const comments = mongoose.model('comments', CommentSchema);

module.exports = comments;