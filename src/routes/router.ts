import express, { Response, Request, Router } from "express";
import { debuglog } from "../helpers/debuglog";

/**
 * @fileoverview This file includes all API routes for server
 */
const router: Router = express.Router() // activate router
// DEPENDENCIES
import * as userCtrl from "../controllers/user_controller"





//test
router.get('/test', (req: Request, res: Response): void => {
    debuglog('LOG', 'router - test', 'Router test success')
    res.json({ 'result': ' router test success' })
})
// users
router.post('/signup', userCtrl.signup)
router.post('/login', userCtrl.login)
router.post('/user/getInfo', userCtrl.getUserInfo)
router.post('/user/getUserUserName', userCtrl.getUserUsername)
router.post('/user/updateUserInfo', userCtrl.updateUserInfo)
router.post('/user/updateUserPassword', userCtrl.updateUserPassword)
router.post('/user/deleteUser', userCtrl.deleteUser)
export { router }