/** This file contains all the controller functions for getting feed of user
 * @function getFeed
 */

import mongoose from "mongoose";
import { Picture, User } from "../models";
import { Request , Response } from "express";
import { debuglog } from "../helpers";
/** Get picture feed
 * @param {ObjectId} req.params.userId The _id of the user
 */
export function getFeed(req: Request, res: Response) {
    if (!req.params.userId) {
        res.status(400).json({ result: 'error', message: 'unsatisfied requirements' });
        return;
    }
    const params = {
        userId: new mongoose.Types.ObjectId(req.params.userId)
    }
    User.findById(params.userId) 
    .then(foundUser => {
        if (!foundUser) {
            debuglog('ERROR', 'feed controller', 'username not found')
            res.status(404).json({ result: 'error', message: 'Username not found' });
            return;
        }
    }
    Picture.find({'userId' : { $in : [...foundUser.pictures]}})
    )
}