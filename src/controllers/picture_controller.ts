// @ts-nocheck
import mongoose from "mongoose"
import { debuglog } from "../helpers"
import { Picture, User } from "../models"
import { Request, Response } from "express"
import { db } from "../config"

/**
 * @fileoverview This file contains all controller functions for pictures.
 * Functions:
 * sharePicture
 * getPictureById
 * getPictureIdByUserId
 * deletePicture
 * updatePictureCaption
 */


/**
 * @function post(share) a new picture
 * @param {ObjectId} req.body.userId User`s id
 * @param {string} req.body.description Description
 * @param {Object} req.file Content of post
 */
export function sharePicture(req: Request, res: Response) {
    if (!req.body.userId || !req.body.description || !req.file) {
        res.status(400).json({ result: 'error', message: 'Unsatisfied requirements for posting a picture' })
        return
    }
    const body = {
        userId: new mongoose.Types.ObjectId(req.body.userId),
        description: req.body.description,
        pictureImage: req.file.filename
    }
    User.findOne({ _id: body.userId, isDeleted: false })
        .then((foundUser) => {
            if (!foundUser) {
                debuglog('ERROR', 'picture controller - share(post)', 'user not found');
                res.status(404).json({ result: 'error', message: 'User not found.' });
                return;
            }
            const picture = new Picture(body)
            picture.save()
            if (!foundUser.pictures) {
                // if user has no array of pictures, initialize new array
                foundUser.pictures = []
            }
            // if user has an array of pictures, then save the id of picture and push to an array
            foundUser.pictures.push(picture._id)
            foundUser.save()
            debuglog('LOG', 'picture controller - sharePicture', 'picture  posted')
            res.status(201).json({ result: "success", message: "New picture posted " })
        }).catch(error => {
            debuglog('ERROR', 'picture controller - sharePicture', error)
            res.status(400).json(error)

        })

}
/**
 * @function get a picture by it`s id
 * @param  {ObjectId} req.body._id  ID of a post
 */
export function getPictureById(req: Request, res: Response) {
    if (!req.body._id) {
        res.status(400).json({ result: "error", message: "Unsatisfied requirements for getting picture" })
        return;
    }
    const body = {
        _id: new mongoose.Types.ObjectId(req.body._id) // add type ObjectId to userId
    }
    Picture.findById(body._id)
        .then(foundPicture => {
            if (!foundPicture) {
                debuglog('ERROR', 'picture controller - getPictureByID', 'picture not found');
                res.status(404).json({ result: 'error', message: 'Picture not found.' });
                return;
            }
            // if found picture, divide it by chunks
            const collectionFiles = db.collection('image00.files')
            const collectionChunks = db.collection('image00.chunks')
            // find a picture by its filename. If document exists, find collectionChunks
            collectionFiles.findOne({ filename: picture.pictureImage })
                .then((doc) => {

                    if (!doc) {
                        res.status(404).json({ result: 'error', message: 'File not found.' });
                        console.log(Error)
                        return
                    }
                    // if file is found, sort chunks in the ascending order and declare final data object
                    collectionChunks.find({ files_id: doc._id })
                        .sort({ n: 1 }).toArray(function (err, chunks) {
                            if (err) {
                                res.status(400).json("Failed to find picture image in chunks")
                                return
                            }

                            if (!chunks || chunks.length == 0) {
                                res.status(404).json("No file found")
                                return
                            }
                            // push chunks in byte size to data
                            let fileData = []
                            for (let i = 0; i < chunks.length; i++) {
                                fileData.push(chunks[i].data.toString('base64'))
                            }
                            const finalData = {
                                pictureId: picture._id,
                                userId: picture.userId,
                                description: picture.description,
                                createdAt: picture.createdAT,
                                updatedAt: picture.updatedAt,
                                pictureImage: `data:${doc.contentType};base64,${fileData.join('')}`
                            }
                            debuglog('LOG', 'picture controller - getPictureById', 'Picture was found')
                            res.status(200).json({ result: "success", message: "Found post", data: finalData })

                        })
                })

        }).catch(error => {
            debuglog('ERROR', 'picture controller - getPictureById', error)
            res.status(400).json(error)
            return
        })
}
/**
 * @functionGet pictures by User`s ID
 * @param {ObjectId} req.body.userId The _id of a user
 */
export function getPictureIdByUserId(req: Request, res: Response) {
    if (!req.body.userId) {
        res.status(400).json({ result: 'error', message: 'Unsatisfied requirements for finding pictures of this user' })
        return
    }
    const body = {
        // create new user id 
        userId: new mongoose.Types.ObjectId(req.body.userId)
    }
    Picture.findOne({ userId: body.userId, isDeleted: false }).select('_id').sort({ createdAt: 'descending' })
        .then((pictureIds) => {
            if (!pictureIds) {
                debuglog('ERROR', 'picture controller - getUserPics', 'user has no posts');
                res.status(200).json({ result: 'success', message: 'User has no posts', data: pictureIds });
                return;
            }
            debuglog('LOG', 'picture controller - getUserpics', 'posts  found')
            res.status(200).json({ result: "success", message: "Posts found ", data: pictureIds })
        }).catch(error => {
            debuglog('ERROR', 'picture controller - getUserPics', 'posts are not found')
            res.status(400).json(error)
            return
        })

}
/**
 * @function delete picture
 * @param {ObjectId} req.body.pictureId The ID of a picture
 */
export function deletePicture(req: Request, res: Response) {
    if (!req.body.pictureId) {
        res.status(404).json({ result: 'error', message: 'Unsatisfied requirements for deleting pictures' })
        return
    }
    const body = {
        // create new user id 
        pictureId: new mongoose.Types.ObjectId(req.body.pictureId)
    }
    Picture.findOneAndDelete({ _id: body.pictureId })
        .then(picture => {
            if (!picture) {
                debuglog('ERROR', 'picture controller - deletePic', 'couldn`t find post');
                res.status(404).json({ result: 'error', message: 'Post not found' });
                return;
            }


            const collectionFiles = db.collection('images00.files')
            const collectionChunks = db.collection('images00.chunks')
                .then(doc => {
                    if (!doc) {
                        debuglog('ERROR', 'picture controller - deletePic', 'file not found');
                        res.status(404).json({ result: 'error', message: 'Unsatisfied requirements for deleting pictures' })
                        return
                    }
                    collectionFiles.deleteOne({ filename: picture.pictureImage })
                    collectionChunks.deleteMany({ files_id: doc_id })
                })
            User.findOne({ _id: picture.userId, isDeleted: false })
                .then(foundUser => {
                    // if found user then splice the array of user`s pictures
                    const index = foundUser.pictures.indexOf(picture._id, 0)
                    if (index > -1) {
                        foundUser.pictures.splice(index, 1)
                    }
                    foundUser.save()
                })
            debuglog('LOG', 'picture controller - deletePic', 'deleted post');
            res.status(200).json({ result: 'success', message: 'Post deleted' });
        }).catch(error => {
            debuglog('ERROR', 'picture controller - deletePic', error);
            res.status(400).json(error);
        })
}
/**
 * @function update user`s caption
 * @param {ObjectId} req.body.pictureId The _id of a picture
 * @param {string} req.body.description The new description
 */
export function updatePictureCaption(req: Request, res: Response) {
    if (!req.body.pictureId || !req.body.description) {
        res.status(400).json({ result: "error", message: "Unsatisfied requirements for updating caption" })
        return;
    }
    const body = {
        description: req.body.description
    }
    User.updateOne({ _id: req.body.pictureId }, { $set: body })

        .then((dbResponse) => {
            // if 1 document was changed
            if (dbResponse.modifiedCount == 1) {
                debuglog('LOG', 'picture controller - updateCaption', 'updated caption')
                res.status(201).json({ result: "success", message: "Updated caption" })
                // if document was not found (no match)
            } else if (dbResponse.matchedCount == 0) {
                debuglog('ERROR', 'picture controller - updateCaption', 'picture not found')
                res.status(404).json({ result: "error", message: "Picture not found" })
            }
        })
        .catch((error) => {
            debuglog('ERROR', 'picture controller - updateCaption', error)
            res.status(400).json(error.message)
        })
}
/**
 * @function get all users pictures 
 * Creates an inner join operation between user and pictures collection
 */
export  async function getAllPosts(req: Request, res: Response) {
    try {
        const users = db.collection('users')
        const pictures = db.collection('pictures')

        const allUsers = await users.aggregate([
            {
                $lookup: {
                    from: 'pictures',
                    localField: '_id',
                    foreignField: 'userId',
                    as: 'posts'
                }
            }
        ]).toArray()
        res.send(allUsers)
    }
    catch (error) {
        res.status(500).send('Error fetching users and posts')

    }
}