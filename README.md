## This is a backend folder for the blog project.

## Technology

This backend is created with:

- Node.js
- Express.js
- MongoDB
- Body-parser
- Cors
- Dotenv
- Nodemon

## Functionality

### Users

- Signup
- Login
- Get user info
- Update user info
- Update user password
- Delete user

### Pictures

- Share Picture
- Get Picture (single)
- Get Pictures By User
- Delete Pictures
- Update Caption

- Get all users posts( main page )
### API endpoints

All the endpoints follow the structure:
https://localhost:PORT/api/ENDPOINTS
For the frontend usage, documentation should be added here:

- Space for link to Readme.md API documentation

## For Backend Devs

### Starting the Backend

1.  Go to [MongoDB Atlas Cloud](https://www.mongodb.com/cloud/atlas/register) to create a MongoDB database on the cloud. Follow their documentation on how to create a cluster. Remember to add all IP addresses so that your app can be accessible anywhere, and create a user so that the server can successfully connect to the database using the credentials. 
2. Create `.env` file and set the following env variables: `BACKEND_PORT`, `MONGOATLAS_CLUSTER`, `MONGOATLAS_USERNAME`, `MONGOATLAS_PASSWORD`. Remember to add `.env` to your `.gitignore` file. 
( To generate secret token, run this in the console :
   `node -e "console.log(require('crypto').randomBytes(256).toString('base64'));"`)
3. Run `ts-node server.ts`. If you want to run the server in the background, run `nohup ts-node server.ts`.
 
   You can find all endpoints system via `./src/routes/router.ts`
   All controller functions are at path `./src/controllers/...`
   There are two models in project:

- picture model (database test_pictures)
- user model (database user_pictures)

Tasks:

- test endpoints with REST API
- create documentation for API endpoints for frontend devs
- host backend,database, API

## Useful links
https://github.com/jaeyoungchang5/share-my-sunset Example of blog app