/**
 * @fileoverview This file contains all the controller functions related to user:
 * signup
 * login
 * getUserInfo
 * getUserUsername
 * updateUserInfo
 * updateUserPassword
 * deleteUser
 * admin updateUserPassword ?
 */
import { Request, Response, NextFunction } from "express";
import { debuglog, createToken } from "../helpers"
import { User } from "../models";
import mongoose from "mongoose";
class UserController {
    constructor() {

    }
    // testing function
    async getUsers(req: Request, res: Response, next: NextFunction) {
        return res.status(200).json({
            success: true,
            data: [
                {
                    name: "John",
                },
                {
                    name: "Steve"
                },
            ],
        })
    }
}
export default new UserController()

/**
 * @description signup a new user
 * @param {string} req.body.firstName User`s firstname
 * @param {string} req.body.lastName User`s lastname
 * @param {string} req.body.username User`s username
 * @param {string} req.body.password User`s password
 * @param {string} req.body.bio User`s bio
 * doesn`t return a value
 */
export function signup(req: Request, res: Response): void {
    if (!req.body.firstName || !req.body.lastName || !req.body.username || !req.body.password) {
        res.status(400).json({ result: "error", message: "Unsatisfied requirements for signup" })
        return;
    }

    const body = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username.toLowerCase(),
        password: req.body.password,
        bio: req.body.bio

    }
    const user = new User(body)
    user.save()
        .then(newUser => {
            debuglog('LOG', 'user controller - signup', 'signup new user success')
            // create a file for token declaration in helpers folder
            // const token = createToken(newUser)
            res.status(201).json({ result: "success", message: "User signup" })
        }).catch((error) => {
            if (error.code == 11000) {
                return res.status(400).json({ result: 'failed', message: 'User already exists' })
            }
            debuglog('LOG', 'user controller - signup', 'signup fail')
            console.log(error)
            res.status(500).json({ result: 'failed', message: 'Server error' })
        })
}

/** @function for creating the login user (already registered)
 *  @param {string} req.body.username User`s username
 * @param {string} req.body.password User`s password
 */

export function login(req: Request, res: Response): void {
    if (!req.body.username || !req.body.password) {
        res.status(400).json({ result: "error", message: "Unsatisfied requirements for login" })
        return;
    }

    const body = {
        username: req.body.username.toLowerCase(),
        password: req.body.password,
    }
   
    User.findOne({ username: body.username, isDeleted: false })
        .then((foundUser) => {
            if (!foundUser) {
                debuglog('ERROR', 'user controller - login', 'user not found')
                res.status(402).json({ result: "error", message: "User not found" })
                return
            }
            // check given password against password in db 
            if (foundUser.checkPassword(body.password)) {
                debuglog('LOG', 'user controller - login', 'found user, correct password')
                const token = createToken(foundUser)
                res.header('auth-token', token)
                res.status(201).json({ result: "success", message: "Login successful", token: token, userId: foundUser._id })
            } else {
                debuglog('ERROR', 'user controller - login', 'found user, incorrect password, login unauthorized')
                res.status(401).json({ result: "error", message: "Incorrect password" })
            }
        }).catch((error) => {
            debuglog('ERROR', 'user controller - login', error)
            res.status(400).json(error)
            return
        })
}


/**
 * @function get user info by checking user`s id
 * @param {ObjectId} req.params.userId User`s id
 */

export function getUserInfo(req: Request, res: Response) {
    console.log(req.params)
    if (!req.params.userId) {
        res.status(400).json({ result: "error", message: "Unsatisfied requirements for getting user`s info" })
        return;
    }
    const params = {
        userId: new mongoose.Types.ObjectId(req.params.userId) // add type ObjectId to userId
    }
    User.findOne({ _id: params.userId, isDeleted: false }).select('username firstName lastName bio')
        .then(userData => {
            if (userData) {
                debuglog('LOG', 'user controller - getUserInfo', 'user  found')
                res.status(200).json({ result: "success", message: "User  found" })
            } else {
                debuglog('ERROR', 'user controller - get info', 'user not found')
                res.status(404).json({ result: "error", message: "User not found" })
            }
        }).catch(error => {
            debuglog('ERROR', 'user controller - get info', error)
            res.status(500).json(error)
            return
        })
}

// // test function to get user info by id
// let findUsers = async (req: Request, res: Response) => {
//     try {
//         const user = await User.findById(req.params.id);
//         if (!user) {
//             return res.status(404).json({ error: 'User not found' });
//         }
//         res.json(user);
//     } catch (err) {
//         res.status(500).json({ error: Error });
//     }
// };
// export { findUsers }

/**
 * @function get username for user with user`s id
 * @param {ObjectId} req.params.userId User`s id
 */
export function getUserUsername(req: Request, res: Response) {
    if (!req.params.userId) {
        res.status(400).json({ result: "error", message: "Unsatisfied requirements for getting user`s username" })
        return;
    }
    const params = {
        userId: new mongoose.Types.ObjectId(req.params.userId) // add type ObjectId to userId
    }
    User.findOne({ _id: params.userId, isDeleted: false }).select('username')
        .then(userData => {
            if (userData) {
                debuglog('LOG', 'user controller - getUserUsername', 'got user info')
                res.status(200).json({ result: "success", data: userData })
            } else {
                debuglog('ERROR', 'user controller - getUserUsername', 'user not found')
                res.status(404).json({ result: "error", message: "User not found" })
            }
        }).catch(error => {
            debuglog('ERROR', 'user controller - getUserUsername', error)
            res.status(400).json(error)
            return
        })
}




/**
 * @function updateUserInfo without password
 * @param {ObjectId} req.body.userId User`s id
 * @param {Object} req.body all parameters which user wants to update: {"key": "value","key": "value", etc.}
 */
export function updateUserInfo(req: Request, res: Response) {
    if (!req.body.userId) {
        res.status(400).json({ result: "error", message: "Unsatisfied requirements for updating user`s info" })
        return;
    }
    const userId = new mongoose.Types.ObjectId(req.body.userId) // add type ObjectId to userId

    let body: { [key: string]: any } = {};
    let key: string
    for (key in req.body) {
        // create an array of data which should not be updated
        const dontTouch: string[] = ['password', '_id', 'pictures', 'isDeleted']
        // if there is a key which user want to update | key is undefined => loop continues
        if (req.body[key] == undefined || dontTouch.includes(key)) {
            continue;
        }
        // if key is a username, convert to lower case and continue
        if (key == 'username') {
            body[key] = req.body[key].toLowerCase()
            continue
        }
        // convert the updated data from request to body to send it to db
        body[key] = req.body[key]
        // if key length is 0, return error
    }

    if (Object.keys(body).length == 0) {
        debuglog('ERROR', 'user controller - updateUserInfo', 'nothing to update')
        res.status(400).json({ result: "error", message: "Nothing to update" })
        return
    }
    // Write update one query which filters and sets a new data into db
    User.updateOne({ _id: userId, isDeleted: false }, { $set: body })
        .then(dbResponse => {
            // if 1 document was changed
            if (dbResponse.modifiedCount == 1) {
                debuglog('LOG', 'user controller - updateUserInfo', 'updates user info')
                res.status(201).json({ result: "success", message: "User update successful" })
                // if 0 document was changed
            } else if (dbResponse.matchedCount == 0) {
                debuglog('ERROR', 'user controller - updateUserInfo', 'user not found')
                res.status(404).json({ result: "error", message: "User not found" })
            } else if (dbResponse.modifiedCount == 0) {
                debuglog('ERROR', 'user controller - updateUserInfo', 'info not updated')
                res.status(400).json({ result: "error", message: "No info updated" })

            }
        }).catch(error => {
            debuglog('ERROR', 'user controller - updateUserInfo', error)
            res.status(400).json(error.message)
        })

}
/**
 * @function Update user password
 * @param {ObjectId} req.body.userId User`s id
 * @param {string} req.body.oldPassword User`s old password
 * @param {string} req.body.newPassword User`s new password
 */
export function updateUserPassword(req: Request, res: Response) {
    if (!req.body.userId || !req.body.oldPassword || !req.body.newPassword) {
        res.status(400).json({ result: "error", message: "Unsatisfied requirements for updating user`s password" })
        return;
    }
    const body = {
        userId: req.body.userId,
        oldPassword: req.body.oldPassword,
        newPassword: req.body.newPassword
    }
    User.findOne({ _id: body.userId, isDeleted: false })
        .then(foundUser => {
            if (!foundUser) {
                debuglog('ERROR', 'user controller - updateUserPassword', 'user not found')
                res.status(404).json({ result: "error", message: "User not found" })
                return
            }
            debuglog('LOG', 'user controller - updateUserPassword', 'attempting to update user password')
            // create a function with checks with given body old password and replaces it with new, saves it 
            if (foundUser.checkPassword(body.oldPassword)) {
                foundUser.password = body.newPassword
                foundUser.save()
                    // if password is updated => create a token
                    .then((newUser) => {
                        debuglog('LOG', 'user controller - updateUserPassword', 'Updated password successfully')
                        const token = createToken(newUser)
                        res.status(201).json({ result: "success", message: "Updated password", token: token })
                    })
            } else {
                debuglog('ERROR', 'user controller - updateUserPassword', ' found user, Incorrect password')
                res.status(401).json({ result: "error", message: "Incorrect password" })
            }

        }).catch(error => {
            debuglog('ERROR', 'user controller - updateUserPassword', error)
            res.status(400).json(error)
            return
        })

}
/**
 * @function Delete user 
 * @param {ObjectId} req.params.userId User`s id
 */
export function deleteUser(req: Request, res: Response) {
    if (!req.params.userId) {
        res.status(400).json({ result: "error", message: "Unsatisfied requirements for deleting user" })
        return;
    }
    const userId = new mongoose.Types.ObjectId(req.params.userId)
    User.updateOne({ _id: userId, isDeleted: false }, { $set: { isDeleted: true } })

        .then((dbResponse) => {
            // if 1 document was changed
            if (dbResponse.modifiedCount == 1) {
                debuglog('LOG', 'user controller - deleteUser', 'deleted user')
                res.status(201).json({ result: "success", message: "User delete successful" })
                // if 0 document was changed
            } else if (dbResponse.matchedCount == 0) {
                debuglog('ERROR', 'user controller - deleteUser', 'user not found')
                res.status(404).json({ result: "error", message: "User not found" })
            }
        })
        .catch((error) => {
            debuglog('ERROR', 'user controller - deleteUser', error)
            res.status(400).json(error.message)
        })
}
// DELETE user by ID
// export  async function deleteUser(req: Request, res: Response) {
 
//     try {
//         const deletedUser = await User.findByIdAndDelete(req.params.id);

//         if (!deletedUser) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         return res.status(200).json({ message: 'User deleted successfully' });
//     } catch (err) {
//         console.error(err);
//         return res.status(500).json({ message: 'Internal server error' });
//     }
// };




/** OPTIONAL
 * @function Update user password by admin 
 * 
 * @param {ObjectId} req.body.userId User`s id
 */

