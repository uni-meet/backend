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

//FIXME - posts are not created, but visible in db
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
    //NOTE - function User.findOne always compares _id with userId !!!
    User.findOne({ _id: body.userId, isDeleted: false })
        .then((foundUser) => {
            if (!foundUser) {
                debuglog('ERROR', 'picture controller - share(post)', 'user not found');
                res.status(404).json({ result: 'error', message: 'User not found.' });
                return;
            }
            const picture = new Picture(body, { comments: [], likes: [] })
            picture.save()
            if (!foundUser.pictures) {
                // if user has no array of pictures, initialize new array
                foundUser.pictures = [],
                    comments = [],
                    likes = []
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



import fs from 'fs' // import the Node.js file system module
import { Like } from "../models/like_model"

// // read the picture file from disk
// const pictureData = fs.readFileSync('./test.png');

// // create a new instance of the Picture model
// const picture = new Picture({
//     userId: "644261afa7c59d2ccdce2c4e", // replace with the user ID
//     pictureImage: pictureData, // set the picture data as a Buffer
//     description: 'A beautiful landscape', // replace with the picture description
//     comments: [{
//         "user": "643fbc01bab3448131d7111d",
//         "text": "Nice pic!",
//         "createdAt": Date.now()
//     }],
//     likes: []
// });

// picture.save()
//     .then(savedPicture => {
//         console.log('Picture saved successfully:', savedPicture);
//         debuglog('LOG', 'picture controller - sharePicture', 'picture  posted')
//     })
//     .catch(error => {
//         console.error('Error saving picture:', error);
//     });



/**
 * @function get a picture by it`s id
 * @param  {ObjectId} req.params.pictureId   ID of a post
 * /// parameters changed to pictureId @param _id should be!
 //REVIEW - The params object is created with _id key 
 but the findById method is called with _id replaced by pictureId. To fix this issue,
  you can replace req.params._id with req.params.pictureId in the params object.
 */
//!SECTION OLD
// export function getPictureById(req: Request, res: Response) {
//     if (!req.params.pictureId) { // response should be according API endpoint, and change what is sent to db
//         res.status(400).json({ result: "error", message: "Unsatisfied requirements for getting picture" })
//         return;
//     }
//     //NOTE - changes here   pictureId: new mongoose.Types.ObjectId(req.params.pictureId) // add type ObjectId to userId , req.params according to API
//     const params = {
//         _id: new mongoose.Types.ObjectId(req.params.pictureId) // add type ObjectId to userId , req.params according to API
//     }
//     Picture.findById(params)
//         .then(foundPicture => {
//             if (!foundPicture) {
//                 debuglog('ERROR', 'picture controller - getPictureByID', 'picture not found');
//                 res.status(404).json({ result: 'error', message: 'Picture not found.' });
//                 return;
//             }
//             // if found picture, divide it by chunks
//             const collectionFiles = db.collection('image00.files')
//             const collectionChunks = db.collection('image00.chunks')
//             // find a picture by its filename. If document exists, find collectionChunks
//             collectionFiles.findOne({ filename: foundPicture.pictureImage })
//                 .then((doc) => {

//                     if (!doc) {
//                         res.status(404).json({ result: 'error', message: 'File not found.' });
//                         console.log(Error)
//                         return
//                     }
//                     // if file is found, sort chunks in the ascending order and declare final data object
//                     collectionChunks.find({ files_id: doc._id })
//                         .sort({ n: 1 }).toArray(function (err, chunks) {
//                             if (err) {
//                                 res.status(400).json("Failed to find picture image in chunks")
//                                 return
//                             }

//                             if (!chunks || chunks.length == 0) {
//                                 res.status(404).json("No file found")
//                                 return
//                             }
//                             // push chunks in byte size to data
//                             const fileData = []
//                             for (let i = 0; i < chunks.length; i++) {
//                                 fileData.push(chunks[i].data.toString('base64'))
//                             }
//                             const finalData = {
//                                 pictureId: foundPicture._id,
//                                 userId: foundPicture.userId,
//                                 description: foundPicture.description,
//                                 createdAt: foundPicture.createdAT,
//                                 updatedAt: foundPicture.updatedAt,
//                                 pictureImage: `data:${doc.contentType};base64,${fileData.join('')}`,
//                                 comments: foundPicture.comments,
//                                 likes: foundPicture.likes
//                             }
//                             debuglog('LOG', 'picture controller - getPicture', 'Picture was found')
//                             res.status(200).json({ result: "success", message: "Found post", data: finalData })

//                         })
//                 })

//         }).catch(error => {
//             debuglog('ERROR', 'picture controller - getPicture', error)
//             res.status(400).json(error)
//             return
//         })
// }
//!SECTION NEW
/** @function get a picture by it`s id
 * @param  {ObjectId} req.params.pictureId   ID of a post
*/

export async function getPictureById(req: Request, res: Response) {
    if (!req.params.pictureId) { // response should be according API endpoint, and change what is sent to db
        res.status(400).json({ result: "error", message: "Unsatisfied requirements for getting picture" })
        return;
    }
    //NOTE  req.params according to API
    const params = {
        _id: new mongoose.Types.ObjectId(req.params.pictureId) // add type ObjectId to userId , req.params according to API
    }
    try {
        const picture = await Picture.findById(params._id)
            .populate("likes", "username")
            .populate({
                path: "comments",
                populate: {
                    path: "user",
                    select: "username",
                },
            });

        if (!picture) {
            debuglog('ERROR', 'picture controller - getUserPics', 'user has no posts');
            throw new Error("Picture not found");
        }

        if (picture) {

            res.status(200).json({ result: "success", message: "Found post", data: picture })
        }


    } catch (error) {
        debuglog('ERROR', 'picture controller - getUserPics', 'posts are not found')
        res.status(404).json({ message: error.message });
    }

}
//FIXME - Get pics by USER id
/**
 * @function Get pictures by User`s ID
 * @param {ObjectId} req.params.userId The _id of a user
 */
export async function getPictureByUserId(req: Request, res: Response) {
    if (!req.params.userId) {
        res.status(400).json({ result: 'error', message: 'Unsatisfied requirements for finding pictures of this user' })
        return
    }

    try {
        const userId = req.params.userId;
        const pictures = await Picture.find({ userId: userId, isDeleted: false })
            .sort({ createdAt: 'descending' })
            .populate("likes", "username")
            .populate({
                path: "comments",
                populate: {
                    path: "user",
                    select: "username",
                },
            });

        // FIXME -  userId - ?
        // const pictures = Picture.find({ userId: params.userId, isDeleted: false })
        // .select('_id')
        // .sort({ createdAt: 'descending' })
        if (pictures.length === 0) {
            debuglog('ERROR', 'picture controller - getUserPics', 'user has no posts');
            res.status(404).json({ result: 'error', message: 'User has no posts', data: pictures });
            return;
        }
        if (pictures.length > 0) {
            debuglog('LOG', 'picture controller - getUserpics', 'posts  found')
            res.status(200).json({ result: "success", message: "Posts found ", data: pictures })
        }
    } catch (error: any) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map((val: any) => val.message);
            return res.status(400).json({ error: messages.join(', ') });
        }
        console.error(error);
        return res.status(500).json({ message: 'Error finding post.' });
    }

}
// get user by it`s id 
//ANCHOR - Test
export async function create(req: Request, res: Response) {
    const { userId, description, pictureImage } = req.body;

    try {
        // create a new picture object
        const picture = new Picture({
            userId,
            description,
            pictureImage,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        // save the picture to the database
        const newPicture = await picture.save();

        // retrieve the pictures associated with the user
        const pictures = await getPicturesByUserId(userId);

        res.status(201).json({
            result: "success",
            message: "Picture created successfully",
            data: { picture: newPicture, userPictures: pictures },
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function getPicturesByUserId(userId: string) {
    try {
        const pictures = await Picture.find({ userId }).exec();
        return pictures;
    } catch (error) {
        throw new Error("Failed to retrieve pictures by user ID");
    }
}




/**
 * @function delete picture
 * @param {ObjectId} req.params.pictureId The ID of a picture
 */
export function deletePicture(req: Request, res: Response) {
    if (!req.params.pictureId) {
        res.status(404).json({ result: 'error', message: 'Unsatisfied requirements for deleting pictures' })
        return
    }
    const params = {
        // create new picture id
        pictureId: new mongoose.Types.ObjectId(req.params.pictureId)
    }
    Picture.findOneAndDelete({ _id: params.pictureId })
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
    if (!req.body.pictureId) {
        res.status(400).json({ result: "error", message: "Unsatisfied requirements for updating caption" })
        return;
    }
    const body = {
        description: req.body.description,
    }
    Picture.updateOne({ _id: req.body.pictureId, description: req.body.description }, { $set: body })

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
 * @function get all users pictures with corresponding users fields
 * Creates an inner join operation between user and pictures collection
 */
export async function getAllPosts(req: Request, res: Response) {
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
        console.error(error);
    }
}


export async function commentPicture(req: Request, res: Response) {
    const { userId, pictureId, text } = req.body;

    if (!userId || !pictureId || !text) {
        res.status(400).json({ error: 'Missing required fields' });
        return;
    }


    try {
        const picture = await Picture.findById(pictureId);
        if (picture.length === 0) {
            res.status(404).json({ error: 'Picture not found' });
            return;
        }
        if (picture.length > 0) {
            // Add the comment
            const comment = new Comment({
                user: userId,
                text: text,
                createdAt: new Date()
            });


            picture.comments.push(comment._id);
            picture.comments.push(comment);
            await picture.save();
            return res.status(200).json({ message: 'Comment added successfully', comment });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
}

/**
 * Like a picture.
 *
 * Request body:
 * {
 *   "userId": "the user ID who likes the picture",
 *   "pictureId": "the ID of the picture being liked"
 * }
 */

export async function likePicture(req: Request, res: Response) {

    const { userId, pictureId } = req.body;
    if (!userId || !pictureId) {
        res.status(400).json({ error: 'Missing required fields' });
        return;
    }
    try {
        // Check if the picture exists
        const picture = await Picture.findById(pictureId);
        if (picture.length === 0) {
            return res.status(404).json({ error: 'Picture not found' });
        }
        if (picture.length > 0) {
            // Check if the user has already liked the picture
            if (picture.likes.includes(userId)) {
                return res.status(400).json({ error: 'User has already liked this picture' });
            }
            // Add the comment
            const like = new Like({
                user: userId,
                createdAt: new Date()
            });
            // Add the user ID to the picture's likes array
            picture.likes.push(userId);
            await picture.save();

            return res.status(200).json({ message: 'Picture liked successfully', picture });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
