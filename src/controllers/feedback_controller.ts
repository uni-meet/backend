
import { Request, Response } from "express"
import { Feedback } from "../models/feedback_model";
import { User } from "../models";
import { error } from "console";
import mongoose from "mongoose";
import { debuglog } from "../helpers";

export const createFeedback = async (req: Request, res: Response) => {
    if (!req.body.userId) {
        res.status(400).json({ result: 'error', message: 'Unsatisfied requirements for posting a picture' })
        return
    }
    try {
        const body = {
            userId: new mongoose.Types.ObjectId(req.body.userId),
            name: req.body.name,
            message: req.body.message
        }
        const user = await User.findOne({ _id: body.userId });
        if (!user) {
            console.error(error);
            return res.status(404).json({ error: 'User not found' });

        }

        const feedback = new Feedback({
            user: body.userId,
            name: body.name,
            message: body.message
        });

        const savedFeedback = await feedback.save();
        user.feedbacks.push(savedFeedback._id);
        await user.save();
        debuglog('LOG', 'feedback controller', 'feedback  posted')
        return res.status(201).json({ feedback: savedFeedback });
    } catch (error: any) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map((val: any) => val.message);
            return res.status(400).json({ error: messages.join(', ') });
        }
        console.error(error);
        return res.status(500).json({ message: 'Error sending feedback.' });
    }
};
