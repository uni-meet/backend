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

## Starting the Backend

1. Set up `.env` variables. ( To generate secret token, run this in the console :
   `node -e "console.log(require('crypto').randomBytes(256).toString('base64'));"`)
2. Run `ts-node server.ts`. If you want to run the server in the background, run `nohup ts-node server.ts`.

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

### API endpoints

All the endpoints follow the structure:
https://localhost:PORT/api/ENDPOINTS
For the frontend usage, documentation should be added here:

- Space for link to Readme.md API documentation

## For Backend Devs

You can find all endpoints system via `./src/routes/router.ts`
All controller functions are at path `./src/controllers/...`
There are two models in project:

- picture model (database test_pictures)
- user model (database user_pictures)

Tasks:

- :U+1F525: create an endpoint to get All users info from db (for main page)
- test endpoints with REST API
- create documentation for API endpoints for frontend devs
- host backend,database, API

## Useful links
