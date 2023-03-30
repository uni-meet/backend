## This is a backend folder for the uni-meet project.

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

## Useful links

p.s. API documentation is coming. The endpoints can be found via src/routes/router.ts
