/* This is the configuration file for the MongoDB  database.
The cluster connects to the server via the Mongoose package. */

// import dependencies
import { connect, Connection, connection } from "mongoose";
import { debuglog } from '../helpers/debuglog';


let db: Connection;

const databaseUrl: any = process.env.MONGODB_URI;

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
