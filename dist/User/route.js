"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const route_1 = require("../Common/config/route");
const controller_1 = require("./controller");
class UserRoutes extends route_1.RouteConfig {
    constructor(app) {
        super(app, "UserRoutes");
    }
    configureRoutes() {
        this.app.route(`/users`).get([controller_1.UserController.getUsers]);
        return this.app;
    }
}
exports.UserRoutes = UserRoutes;
let a = ['a'];
let func1 = () => { };
let func2 = [() => { }];
//# sourceMappingURL=route.js.map