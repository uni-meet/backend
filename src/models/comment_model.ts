import mongoose, { Schema, Model, model } from "mongoose";

interface IComment {
    user: mongoose.Types.ObjectId,
    text: String,
    createdAt: Date
}

interface ICommentModel extends IComment, Document { }
const CommentSchema: Schema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    text: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export const Comment: Model<ICommentModel> = model<ICommentModel>('Comment', CommentSchema);
