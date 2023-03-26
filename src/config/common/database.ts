/* This is the configuration file for the MongoDB  database. 
The cluster connects to the server via the Mongoose package. */

// import dependencies
import { Connection, connection } from "mongoose";
import { debuglog } from './debuglog';




// import env variables
const username: string = process.env.MONGOATLAS_USERNAME
const password: string = process.env.MONGOATLAS_PASSWORD
const cluster: string = process.env.MONGOATLAS_CLUSTER
const options: string = '?retryWrites=true&w=majority';

// set up full databaseUrl path
const databaseUrl: string = `mongodb+srv://${username}:${password}@${cluster}${options}`;
let db: Connection;
 function connectDB(): void {
    connect(databaseUrl)
    db = connection
    db.once('open', async () => {
        debuglog('LOG', 'database config', `Connected to MongoDB '${db.name}' at '${db.host}' at port ${db.port}`)

    })
    db.on('error', () => {
        debuglog('ERROR', 'database config',  'error connecting to database')
    })
 }
 export {
    connectDB, db
 }
