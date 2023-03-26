import express, {  Response, Request, Router } from "express";
import { debuglog } from "../helpers/debuglog";

/**
 * @fileoverview This file includes all API routes for server
 */
const router: Router = express.Router() // activate router
//test
router.get('/test', (req: Request, res: Response): void => {
debuglog('LOG', 'router - test' , 'Router test success')
res.json({ 'result' : ' router test success'})
})