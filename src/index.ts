import express, { Express, Application, Request, Response } from 'express';
import * as http from 'http';
import cors  from "cors";
import * as dotenv from "dotenv";
import { RouteConfig  } from './Common/config/route';
import { UserRoutes } from './User/route';
import { AuthRoutes } from './Auth/auth.route.config';
import mongoose from 'mongoose';
import debug, { IDebugger } from 'debug';
import { IUser } from './User/user_interface';

const app: Express = express();
const routes: Array<RouteConfig> = []

declare global {
    namespace Express {
        interface Request { 
            user? : IUser;
        }
    }
}

dotenv.config({})
app.use(cors())
app.use(express.json())


// const io = require("socket.io")(http)

const PORT: any = process.env || 8081;
const debugLog: IDebugger = debug("app")

if (process.env.DEBUG) {
    process.on("unhandledRejection", function(reason){
        debug.log("unhandledRejection:", reason)
        process.exit(1)
    })
} else {
}
routes.push(new UserRoutes(app))
routes.push( new AuthRoutes(app))

// app.get('/', (req: Request, res: Response) => {
//     res.send("What's up doc ?!");
// });

const server: http.Server = http.createServer(app)
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)

    routes.forEach((route:RouteConfig)=>{
    console.log(`Routes configured for ${route.getName()}`)
})
})


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


