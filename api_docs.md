# Information for API endpoints

All API endpoints have a path as follows: 'https://localhost:8081/api/ENDPOINTS'

## Installation

To run backend, install
`npm install`
`cd src`
`nohup ts-node server.ts`
Configure an IP adress on MongoDB website for connecting to database. View the link here https://www.mongodb.com/docs/atlas/security/add-ip-address-to-list/.

### To mention

I am using mainly POST methods -- may be illogical, but functions are handled with POST requests. How can I fix this?

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

# Get user`s username `'/user/getUserUserName'`

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
POST https://localhost:8081/api/user/getUserUserMa,e  HTTP/1.1
Content-Type: application/json

{
    "userId": "642563d03d296424b95ac5dc"
}
```

# Update user`s info `'/user/updateUserInfo'`

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
POST https://localhost:8081/api/user/getUserInfo  HTTP/1.1
Content-Type: application/json

{
    "userId": "642563d03d296424b95ac5dc"
}
```

# Update user`s password `'/user/updateUserPassword'`

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
POST https://localhost:8081/api/user/updateUserPassword HTTP/1.1
Content-Type: application/json

{
    "userId": "642563d03d296424b95ac5dc"
}
```

# Delete user `'/user/deleteUser'`

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
POST https://localhost:8081/api/user/deleteUser HTTP/1.1
Content-Type: application/json

{
    "userId": "642563d03d296424b95ac5dc"
}
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
POST https://localhost:8081/api/picture HTTP/1.1
Content-Type: multipart/form-data
Accept: application/json

{
    "userId": "642563d03d296424b95ac5dc",
    "description" : "my first pic",
    "file" : "file.png"
}
```

### Get picture by id `'/picture/getPictureById'`

```
method: 'POST',
 headers: {'Content-Type': 'application/json'},
body:
  {
    "userId": "userId"
  }
```

Example:

```
POST https://localhost:8081/api/picture/getPictureById HTTP/1.1
Content-Type: application/json

{
    "userId": "642563d03d296424b95ac5dc"
}
```

### Get picture Id by User Id `'/picture/getPictureIdByUserId'`

```
method: 'POST',
 headers: {'Content-Type': 'application/json'},
body:
  {
    "_id": "pictureId"
  }
```

Example:

```
POST https://localhost:8081/api/picture/getPictureIdByUserId HTTP/1.1
Content-Type: application/json

{
    "userId": "642563d03d296424b95ac5dc"
}
```

### Delete picture `'/picture/deletePicture'`

```
method: 'POST',
 headers: {'Content-Type': 'application/json'},
body:
  {
    "pictureId": "pictureId"
  }
```

Example:

```
POST https://localhost:8081/api/picture/deletePicture HTTP/1.1
Content-Type: application/json

{
    "pictureId": "642563d03d296424b95ac5dc"
}
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
POST https://localhost:8081/api/picture/updatePictureCaption HTTP/1.1
Content-Type: application/json

{
    "pictureId": "642563d03d296424b95ac5dc",
    "description" : "My new caption!"
}
```

### Get a post feed of all users `/users-posts`

```
method: 'GET',
GET https://localhost:8081/api/users/users-posts HTTP/1.1

```
