/** This file contains all the controller functions for searching
 * Functions:
 * @function searchUser */

import mongoose from 'mongoose';
import { debuglog } from '../helpers';
import { Picture, User } from "../models";
import { Request, Response } from "express";
import { error } from 'console';

// /** Searches given a searchString
//  * @param {string} req.body.searchString Given search string
//  */
// export function searchUsers(req: Request, res: Response): void {
//     if (!req.body.searchString) {
//         res.status(400).json({ result: 'error', message: 'unsatisfied requirements' });
//         return;
//     }
//     User.find({ $text: { $search: req.body.searchString } })
//         .select(' _id username firstName lastName')
//     Picture.find({ $text: { $search: req.body.searchString } })
//         .select(' _id userId pictureImage description comments likes')

//         .then(searchResults => {
//             debuglog('LOG', 'search controller- search users', 'completed search');
//             res.status(200).json({ result: 'success', data: searchResults });
//         }).catch(error => {
//             debuglog('ERROR', 'search controller-search users', error);
//             res.status(400).json(error)
//             return
//         })

// }
//FIXME - not working
export async function searchUser(req: Request, res: Response) {

    if (!req.body.searchString) {
        res.status(400).json({ result: 'error', message: 'unsatisfied requirements' });
        return;
    }
    User.aggregate([
        {
            $match: {
                $text: { $search: req.body.searchString }
            }
        },
        {
            $lookup: {
                from: "pictures",
                localField: "_id",
                foreignField: "userId",
                as: "pictures"
            }
        },
        {
            $project: {
                _id: 1,
                username: 1,
                firstName: 1,
                lastName: 1,
                pictures: {
                    _id: 1,
                    userId: 1,
                    pictureImage: 1,
                    description: 1,
                    comments: 1,
                    likes: 1
                }
            }
        }
    ])

        .then(searchResults => {
            debuglog('LOG', 'search controller - search users', 'completed search');
            res.status(200).json({ result: 'success', data: searchResults });
        })

        .catch(error); {
        console.log(error)
        res.status(500).send('Error searching results')

    }
}
