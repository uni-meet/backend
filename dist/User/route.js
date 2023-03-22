"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const route_1 = require("../Common/config/route");
const controller_1 = __importDefault(require("./controller"));
class UserRoutes extends route_1.RouteConfig {
    constructor(app) {
        super(app, "UserRoutes");
    }
    configureRoutes() {
        this.app.route(`/users`).get([controller_1.default.getUsers]);
        return this.app;
    }
}
exports.UserRoutes = UserRoutes;
//# sourceMappingURL=route.js.map