import express, { Express, Application, Request, Response } from 'express';
import * as http from 'http';
import cors  from "cors";
import * as dotenv from "dotenv";
import { RouteConfig  } from './Common/config/route';
import { UserRoutes } from './User/route';
import mongoose from 'mongoose';

const routes: Array<RouteConfig> = []

const app: Express = express();
dotenv.config({})
app.use(cors())
app.use(express.json())


// const io = require("socket.io")(http)

const PORT: any = process.env || 8081;

if (process.env.DEBUG) {
    process.on("unhandledRejection", function(reason){
        process.exit(1)
    })
} else {
}
routes.push(new UserRoutes(app))

app.get('/', (req: Request, res: Response) => {
    res.send("What's up doc ?!");
});

const server: http.Server = http.createServer(app)
server.listen(8081, () => {
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


