
import { Request, Response } from "express"
import { Feedback } from "../models/feedback_model";
import { User } from "../models";

export const createFeedback = async (req: Request, res: Response) => {
    try {

        const { userId } = req.params;
        const { name, message } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const feedback = new Feedback({
            user: user.id,
            name,
            message,
        });

        const savedFeedback = await feedback.save();
        user.feedbacks.push(savedFeedback._id);
        await user.save();
        return res.status(201).json({ feedback: savedFeedback });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error sending feedback.' });
    }
};
