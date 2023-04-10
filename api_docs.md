# Information for API endpoints

All API endpoints have a path as follows: 'http://localhost:8081/api/ENDPOINTS'
Do not forget to write API in the path!
## Installation

To run backend, install
`npm install`
`cd src`
`nohup ts-node server.ts`
Configure an IP adress on MongoDB website for connecting to database. View the link here http://www.mongodb.com/docs/atlas/security/add-ip-address-to-list/.





### Link for frontend example for fetching API
http://github.com/jaeyoungchang5/share-my-sunset 
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
POST http://localhost:8081/api/signup  HTTP/1.1
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
POST http://localhost:8081/api/login  HTTP/1.1
Content-Type: application/json

{
    "username" : "john-dave",
    "password" : "1234"
}
```

# Get Info of User `'/user/getInfo/:id'`

```
 method: 'GET',
 GET   http://localhost:8081/api/user/getInfo/{userId}
```

Example:

```
GET   http://localhost:8081/api/user/getInfo/642563d03d296424b95ac5dc  HTTP/1.1
```

# Get users username `'/user/getUserUserName/:id'`

```
 method: 'GET',
GET http://localhost:8081/api/user/getUserUserName/:id  HTTP/1.1
```

Example:

```
GET http://localhost:8081/api/user/getUserUserName/642563d03d296424b95ac5dc  HTTP/1.1
```

# Update users info `'/user/updateUserInfo'`

```
 method: 'POST',
 headers: {'Content-Type': 'application/json'},
  body:
  {
    "userId": "_id"
  }
```

Example:

```
POST http://localhost:8081/api/user/updateUserInfo  HTTP/1.1
Content-Type: application/json

{
    "userId": "642563d03d296424b95ac5dc"
}
```

# Update users password `'/user/updateUserPassword'`

```
 method: 'POST',
 headers: {'Content-Type': 'application/json'},
  body:
  {
    "userId": "_id"
  }
```

Example:

```
POST http://localhost:8081/api/user/updateUserPassword HTTP/1.1
Content-Type: application/json

{
    "userId": "642563d03d296424b95ac5dc"
}
```

# Delete user `'/user/deleteUser'`

```
 method: 'DELETE',
DELETE http://localhost:8081/api/user/deleteUser/:id HTTP/1.1
```

Example:

```
DELETE http://localhost:8081/api/user/deleteUser/642563d03d296424b95ac5dc HTTP/1.1

```

## Picture endpoints

### Post picture `'/picture'`

```
method: 'POST',
     headers: { 'Content-Type': 'multipart/form-data; ', 'Accept': 'application/json' },
body:
  {
    "userId": "_id",
    "description" : "description",
    "file" : "pictureImage"
  }
```

Example:

```
POST http://localhost:8081/api/picture HTTP/1.1
Content-Type: multipart/form-data
Accept: application/json

{
    "userId": "642563d03d296424b95ac5dc",
    "description" : "my first pic",
    "file" : "file.png"
}
```

### Get picture by id `'/picture/getPictureById/:pictureId'`

```
method: 'GET',
GET http://localhost:8081/api/picture/getPictureById/:pictureId HTTP/1.1

```

Example:

```
POST http://localhost:8081/api/picture/getPictureById/:pictureId HTTP/1.1
```

### Get picture Id by User Id `'/picture/getPictureIdByUserId/:userId'`

```
method: 'GET',
GET http://localhost:8081/api/picture/getPictureByUserId/:userId HTTP/1.1
```

Example:

```
GET http://localhost:8081/api/picture/getPictureById/:userId HTTP/1.1
```

### Delete picture `'/picture/deletePicture/:pictureId'`

```
method: 'DELETE',
DELETE http://localhost:8081/api/picture/deletePicture/:pictureId HTTP/1.1
```

Example:

```
DELETE http://localhost:8081/api/picture/deletePicture/:pictureId HTTP/1.1
```

### Update picture caption `'/picture/updatePictureCaption'`

```
method: 'POST',
 headers: {'Content-Type': 'application/json'},
body:
  {
    "pictureId": "pictureId",
    "description" : "description"
  }
```

Example:

```
POST http://localhost:8081/api/picture/updatePictureCaption HTTP/1.1
Content-Type: application/json

{
    "pictureId": "642563d03d296424b95ac5dc",
    "description" : "My new caption!"
}
```

### Get a post feed of all users `/users-posts`

```
method: 'GET',
GET http://localhost:8081/api/users/users-posts HTTP/1.1

```
