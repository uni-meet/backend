/** This file contains all the controller functions for searching
 * Functions:
 * @function searchUsers */

import { debuglog } from '../helpers';
import { User } from "../models";
import { Request, Response } from "express";

/** Searches given a searchString
 * @param {string} req.body.searchString Given search string
 */
export function searchUsers(req: Request, res: Response): void {
    if (!req.body.searchString) {
        res.status(400).json({ result: 'error', message: 'unsatisfied requirements' });
        return;
    }
    User.find({ $text: { $search: req.body.searchString } })
        .select(' _id username firstName lastName')
        .then(searchResults => {
            debuglog('LOG', 'search controller- search users', 'completed search');
            res.status(200).json({ result: 'success', data: searchResults });
        }).catch(error => {
            debuglog('ERROR', 'search controller-search users', error);
            res.status(400).json(error)
            return
        })

}