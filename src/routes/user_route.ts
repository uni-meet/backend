import { RouteConfig } from "./router"
import express, { Express, Application, Request, Response } from "express"
import UserController from "../controllers/user_controller"

export class UserRoutes extends RouteConfig {
    constructor(app: Application) {
        super(app, "UserRoutes")
    }
    configureRoutes() {
        this.app.route(`/users`).get([UserController.getUsers])
        return this.app
    }
}
