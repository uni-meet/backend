import { RouteConfig } from "../Common/config/route"
import express, { Application, Request, Response } from "express"
import { UserController } from "./controller"

export class UserRoutes extends RouteConfig {
    constructor(app: Application) {
        super(app, "UserRoutes")
    }
    configureRoutes() {
        this.app.route(`/users`).get([UserController.getUsers])
        return this.app
    }
}

let a = ['a']

let func1 = () => {}

let func2 = [() => {}]
