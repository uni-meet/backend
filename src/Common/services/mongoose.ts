import mongoose from "mongoose";
import debug, { IDebugger } from "debug" 

const log: IDebugger = debug("app:mongoose-service")


class MongooseService {
    private count = 0
    private mongooseOptons = {
        useNewUrlParser: true,
        useUnifiedTopology:true,
        useCreateIndex: true,
        serverSelectionTimeoutMS: 5000,
        useFindandModify: false
    }
    constructor(){
        this.connectWithRetry()
    }
    getInstance() {
        return mongoose
    }
    connectWithRetry() {
        log("process.env.MONGODB_URI", process.env.MONGODB_URI)
        const MONGODB_URI = process.env.MONGODB_URI || ""
        log("Connecting to MongoDB(Retry when failed")
        mongoose
        .connect(MONGODB_URI, this.mongooseOptons)
        .then( () => {
            log("MongoDB is connected")
        })
        .catch(err => {
            const retrySeconds = 5
            log(
                `MongoDB connection is unsuccessful
                 (will retry #${++this.count} after ${retrySeconds} seconds)`, err
            )
            setTimeout(this.connectWithRetry, retrySeconds * 1000)
        })
    }
}
export default new MongooseService()