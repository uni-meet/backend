"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http = __importStar(require("http"));
const cors_1 = __importDefault(require("cors"));
const dotenv = __importStar(require("dotenv"));
const route_1 = require("./User/route");
const routes = [];
const app = (0, express_1.default)();
dotenv.config({});
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// const io = require("socket.io")(http)
const PORT = process.env || 8081;
if (process.env.DEBUG) {
    process.on("unhandledRejection", function (reason) {
        process.exit(1);
    });
}
else {
}
routes.push(new route_1.UserRoutes(app));
app.get('/', (req, res) => {
    res.send("What's up doc ?!");
});
const server = http.createServer(app);
server.listen(8081, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    routes.forEach((route) => {
        console.log(`Routes configured for ${route.getName()}`);
    });
});
// const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@atlascluster.rtquvey.mongodb.net/${process.env.MONGO_DB}`
// mongoose
//     .connect(uri)
//     .then(() =>
//         app.listen(PORT, () =>
//             console.log(`Server running on http://localhost:${PORT}`)
//         )
//     )
//     .catch((error) => {
//         throw error
//     })
// app.use("/api/user", userRouter);
// app.use("/api/post", PostRouter)
//# sourceMappingURL=index.js.map