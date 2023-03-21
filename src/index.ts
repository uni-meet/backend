import express from 'express';
import cors from 'cors';
import * as dotenv from "dotenv";
import mongoose from 'mongoose';
const http = require("http").createServer(express)
const io = require("socket.io")(http)

const app: Express = express();
const PORT: any = process.env || 8081;
const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@atlascluster.rtquvey.mongodb.net/${process.env.MONGO_DB}`


mongoose
    .connect(uri)
    .then(() =>
        app.listen(PORT, () =>
            console.log(`Server running on http://localhost:${PORT}`)
        )
    )
    .catch((error) => {
        throw error
    })

dotenv.config()


mongoose
    .connect(uri)
    .then(() =>
        app.listen(PORT, () =>
            console.log(`Server running on http://localhost:${PORT}`)
        )
    )
    .catch((error) => {
        throw error
    })
app.use(cors())
app.use(express.json())
app.use("/api/user", userRouter);
app.use("/api/post", PostRouter)
// declare a route with a response
app.get('/', (req, res) => {
    res.send("What's up doc ?!");
});

