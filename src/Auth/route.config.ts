import { Application } from "express";
import { RouteConfig } from "../Common/config/route";


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