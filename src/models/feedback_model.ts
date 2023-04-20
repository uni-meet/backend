import mongoose, { Model, model } from "mongoose";

interface IFeedback {
    userId: mongoose.Types.ObjectId,
    name: String,
    message: String,
    createdAt: Date
}

const FeedbackSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export const Feedback: Model<IFeedback> = model<IFeedback>("Feedback", FeedbackSchema);

