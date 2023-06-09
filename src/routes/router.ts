import express, { Response, Request, Router } from "express";
import { debuglog } from "../helpers/debuglog";

/**
 * @fileoverview This file includes all API routes for server
 */
const router: Router = express.Router() // activate router
// DEPENDENCIES
import * as userCtrl from "../controllers/user_controller"
import * as pictureCtrl from "../controllers/picture_controller"
import * as searchCtrl from '../controllers/search_controller'
import * as feedback from '../controllers/feedback_controller'
import { upload } from "../config/images";







// test
router.get('/test', (req: Request, res: Response): void => {
    debuglog('LOG', 'router - test', 'Router test success')
    res.json({ 'result': ' router test success' })
})

// Here the HTTP methods may be changed. When doing that, check that functions of changed HTTP requests
// have the needed requirements ( the line req.body... should be changed  to req.params... in functions with GET request)
// Also, follow the right path for the API.
/**
 * When it is GET method
 * For ex: router.get('/user/nameOfFunction/:id', next function)
 * When it is POST method, no values are added to URL
 * For ex: router.post('/signup', userCtrl.signup)
 */

// users API endpoints
router.post('/signup', userCtrl.signup)
router.post('/login', userCtrl.login)
router.get('/user/getInfo/:userId', userCtrl.getUserInfo) // change id to userId
router.get('/user/getUserUserName/:userId', userCtrl.getUserUsername)
router.post('/user/updateUserInfo', userCtrl.updateUserInfo)
router.post('/user/updateUserPassword', userCtrl.updateUserPassword)
router.delete('/user/deleteUser/:userId', userCtrl.deleteUser)



// Route to handle file upload
router.post('/upload', upload.single('image'), (req: Request, res: Response) => {
    // Handle file upload logic here
    console.log(req.file); // Print uploaded file object
    res.send('File uploaded successfully');
});


// pictures API endpoints
// router.post('/picture/sharePicture', (upload as Multer).single('image'), pictureCtrl.sharePicture);

router.get('/picture/getPicture/:pictureId', pictureCtrl.getPictureById)
// create a post feed of all users
router.get('/users-posts', pictureCtrl.getAllPosts)
router.delete('/picture/deletePicture/:pictureId', pictureCtrl.deletePicture)




// Like and comment
router.post('/picture/like', pictureCtrl.likePicture);
router.post('/picture/comment', pictureCtrl.commentPicture);

// search
router.post('/search', searchCtrl.searchUser);
// feedback form
router.post('/user/feedback', feedback.createFeedback);

export { router }