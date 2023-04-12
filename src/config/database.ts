/* This is the configuration file for the MongoDB  database.
The cluster connects to the server via the Mongoose package. */

// import dependencies
import { connect, Connection, connection } from "mongoose";
import { debuglog } from '../helpers/debuglog';
import dotenv from "dotenv"


dotenv.config({ path: './env.local' })


// import env variables
const username: any = process.env.MONGOATLAS_USERNAME
const password: any = process.env.MONGOATLAS_PASSWORD
const cluster: any = process.env.MONGOATLAS_CLUSTER
const options: any = '?retryWrites=true&w=majority';


 const databaseUrl: string = 'mongodb+srv://new-user:cBzED0vJcnaz27Zj@cluster1.zgog7ga.mongodb.net/?retryWrites=true&w=majority'
let db: Connection;

// const databaseUrl  = process.env.MONGODB_URI;
function connectDB(): void {
    connect(databaseUrl)
    db = connection
    db.once('open', async () => {
        debuglog('LOG', 'database config', `Connected to MongoDB '${db.name}' at '${db.host}' at port ${db.port}`)

    })
    db.on('error', () => {
        debuglog('ERROR', 'database config', 'error connecting to database')
    })
}
export {
    connectDB, db
}
