import mongoose, { Model, model } from "mongoose";

interface IFeedback {
    name: String,
    message: String,
    createdAt: Date
}

const FeedbackSchema = new mongoose.Schema({
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

