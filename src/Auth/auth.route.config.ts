// Authentication route configuration ( to post the login and signup functions )
import { Application, Request, Response } from "express";
import { RouteConfig } from "../common/config/route";
import AuthController from "./auth.controller"


export class AuthRoutes extends RouteConfig {
    constructor(app: Application) {
        super(app, "AuthRoutes")

    }
    configureRoutes() {
        this.app.route('/login').post(AuthController.login)
        this.app.route('/signup').post(AuthController.signup)
        return this.app
    }
}