# Information for API endpoints
All API endpoints have a path as follows: 'https://localhost:8081/api/ENDPOINTS' 
## Installation
To run backend, install
`npm install`
`cd src`
`nohup ts-node server.ts`
Configure an IP adress on MongoDB website for connecting to database. View the link here https://www.mongodb.com/docs/atlas/security/add-ip-address-to-list/.
## User endpoints
# Signup User `'/signup'`
```
 method: 'POST',
 headers: {'Content-Type': 'application/json'},
 body:
  {
        "firstName": "firstName",
        "lastName": "req.body.lastName",
        "username": "username",
        "password": "password",
        "bio": "bio"
  }
  ```
Example:
```
POST https://localhost:8081/api/signup  HTTP/1.1
Content-Type: application/json

{ 
    "firstName": "Ani",
        "lastName": "Popins",
        "username": "ani_po",
        "password": "12345",
        "bio": "Hey out there!"
}
``` 
# Login User `'/login'`
```
 method: 'POST',
 headers: {'Content-Type': 'application/json'},
  body:
  {
    "username" : "username",
    "password" : "password"
  }
  ```
Example:
```
POST https://localhost:8081/api/login  HTTP/1.1
Content-Type: application/json

{ 
    "username" : "john-dave",
    "password" : "1234"
}
``` 
# Get Info of User '/user/getInfo/:id' 
```
 method: 'GET',
 headers: {'Content-Type': 'application/json'},
 GET   http://localhost:8081/user/getInfo/{userId}
  ```
Example:
```
GET   http://localhost:8081/user/getInfo/642563d03d296424b95ac5dc  HTTP/1.1
``` 
