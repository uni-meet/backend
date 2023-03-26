// import mongoose from "mongoose";
// import debug, { IDebugger } from "debug" 


// const log: IDebugger = debug("app:mongoose-service")

// // // Create an anonymous credential
// // const credentials = Realm.Credentials.anonymous();
// // try {
// //     const user = await app.logIn(credentials);
// //     console.log("Successfully logged in!", user.id);
// //     return user;
// // } catch (err) {
// //     if (err instanceof Error) {
// //         console.error("Failed to log in", err.message);
// //     }
// // }

// class MongooseService {
//     private count = 0
//     private mongooseOptons = {
//         useNewUrlParser: true,
//         useUnifiedTopology:true,
//         useCreateIndex: true,
//         serverSelectionTimeoutMS: 5000,
//         useFindandModify: false
//     }
//     constructor(){
//         this.connectWithRetry()
//     }
//     getInstance() {
//         return mongoose
//     }
//     connectWithRetry() {
//         log("process.env.MONGODB_URI", process.env.MONGODB_URI)
//         const MONGODB_URI = process.env.MONGODB_URI || ""
//         log("Connecting to MongoDB(Retry when failed")
//         mongoose
//         .connect(MONGODB_URI, this.mongooseOptons)
//         .then( () => {
//             log("MongoDB is connected")
//         })
//         .catch(err => {
//             const retrySeconds = 5
//             log(
//                 `MongoDB connection is unsuccessful
//                  (will retry #${++this.count} after ${retrySeconds} seconds)`, err
//             )
//             setTimeout(this.connectWithRetry, retrySeconds * 1000)
//         })
//     }
// }
// export default new MongooseService()

import { Entity, Column, PrimaryGeneratedColumn, createConnection } from 'typeorm';

// Configure database connection
createConnection({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'myuser',
    password: 'mypassword',
    database: 'mydatabase',
    entities: [User],
    synchronize: true,
}).then(() => {
    console.log('Connected to database');
}).catch(error => console.log(error));

// Define user model
@Entity()
class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;
}

// API endpoints
app.post('/api/users', async (req, res) => {
    const { name, email, password } = req.body;

    // Create new user and save to database
    const userRepository = getRepository(User);
    const newUser = new User();
    newUser.name = name;
    newUser.email = email;
    newUser.password = password;
    await userRepository.save(newUser);

    res.send(newUser);
});

app.get('/api/users', async (req, res) => {
    // Get all users from database
    const userRepository = getRepository(User);
    const users = await userRepository.find();

    res.send(users);
});

app.get('/api/users/:id', async (req, res) => {
    const { id } = req.params;

    // Get user by ID from database
    const userRepository = getRepository(User);
    const user = await userRepository.findOne(id);

    if (!user) {
        res.status(404).send('User not found');
    } else {
        res.send(user);
    }
});
