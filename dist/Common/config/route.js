"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouteConfig = void 0;
// abstract module for route configuration
class RouteConfig {
    constructor(app, name) {
        this.app = app;
        this.name = name;
        this.configureRoutes();
    }
    getName() {
        return this.name;
    }
}
exports.RouteConfig = RouteConfig;
//# sourceMappingURL=route.js.map