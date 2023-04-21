import mongoose, { Model, Schema, model } from "mongoose"

interface ILike {
user: mongoose.Types.ObjectId,
createdAt: Date
}

interface ILikeModel extends ILike, Document { }

const LikeSchema: Schema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export const Like: Model<ILikeModel> = model<ILikeModel>("Like", LikeSchema)
