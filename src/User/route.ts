import { RouteConfig } from "../common/config/route"
import express, { Express, Application, Request, Response } from "express"
import UserController from "./controller"

export class UserRoutes extends RouteConfig {
    constructor(app: Application) {
        super(app, "UserRoutes")
    }
    configureRoutes() {
        this.app.route(`/users`).get([UserController.getUsers])
        return this.app
    }
}
