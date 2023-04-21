### User API endpoints

## https://bloggini-backend.onrender.com backend link

## API link https://bloggini-backend.onrender.com/api

Change link of localhost to this backend (in my examples is mentioned localhost)

## User API

You can view router functions in router.ts

router.post('/signup', userCtrl.signup)
router.post('/login', userCtrl.login)
router.get('/user/getInfo/:userId', userCtrl.getUserInfo) // change id to userId
router.get('/user/getUserUserName/:userId', userCtrl.getUserUsername)
router.post('/user/updateUserInfo', userCtrl.updateUserInfo)
router.post('/user/updateUserPassword', userCtrl.updateUserPassword)
router.delete('/user/deleteUser/:userId', userCtrl.deleteUser)

# Sign up

method : POST
https://bloggini-backend.onrender.com/api/signup

```
POST http://localhost:8082/api/signup HTTP/1.1
Content-Type: application/json

{
   "firstName" : "Maria1",
   "lastName" : "Glushenkova1",
   "username" : "maria_glushenkova1",
   "password" : "12345",
   "bio" : "I am creator of this testing mode."
}
```

Response

```
{
 "result": "success",
 "message": "User signup"
}
```

# Login

method : GET
https://bloggini-backend.onrender.com/api/login

```
POST http://localhost:8082/api/login HTTP/1.1
Content-Type: application/json

{
    "username" : "maria_glushenkova",
    "password" : "12345"
}

```

# Get info of user

method : GET
https://bloggini-backend.onrender.com/api/user/getInfo/${userId}

```
GET http://localhost:8082/api/user/getInfo/6440f6be5c0a8d1a47a2ebbc  HTTP/1.1
// Response

{
 "_id": "6440f6be5c0a8d1a47a2ebbc",
 "firstName": "Maria",
 "lastName": "Glushenkova",
 "username": "maria_glushenkova",
 "bio": "I am creator of this testing mode."
}
```

# Get username

method : GET
https://bloggini-backend.onrender.com/api/user/getUserUserName/${userId}

```
###  Get username
GET http://localhost:8082/api/user/getUserUserName/6440f6be5c0a8d1a47a2ebbc  HTTP/1.1
// Response

{
  "result": "success",
  "data": {
    "_id": "6440f6be5c0a8d1a47a2ebbc",
    "username": "maria_glushenkova"
  }
}

```

# Update user info

method : POST
https://bloggini-backend.onrender.com/api/user/updateUserInfo/${userId}

```

### Update user info
POST http://localhost:8082/api/user/updateUserInfo/6440f6be5c0a8d1a47a2ebbc  HTTP/1.1
Content-Type: application/json

{
    "userId": "6440f6be5c0a8d1a47a2ebbc",
    "username" : "maria_glushenkova",
    "bio" : "new bio2"
}

// Response
{
  "result": "success",
  "message": "User update successful"
}
```

# Update user password

method : POST
https://bloggini-backend.onrender.com/api/user/updateUserPassword/${userId}

```

### Update user password
POST http://localhost:8082/api/user/updateUserPassword/6440f6be5c0a8d1a47a2ebbc  HTTP/1.1
Content-Type: application/json

{
    "userId": "6440f6be5c0a8d1a47a2ebbc",
    "oldPassword" : "1235",
    "newPassword" : "123567"
}

// Response

# {
#   "result": "success",
#   "message": "Updated password",
#   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImJvZHkiOnsidXNlcklkIjoiNjQ0MGY2YmU1YzBhOGQxYTQ3YTJlYmJjIn19LCJpYXQiOjE2ODE5ODE2NzR9.3QPUD1r2PXUe9r9AVYG3BxykOyzGq51sMDnLLkfteAU"
# }
```

# Delete user

method : DELETE
https://bloggini-backend.onrender.com/api/user/deleteUser/${userId}

```

// if user is already deleted
{
  "result": "error",
  "message": "User not found"
}

// Response
{
  "result": "success",
  "message": "User delete successful"
}
```

# Create a feedback

method : POST
https://bloggini-backend.onrender.com/api/user/feedback

```

### Feedback testing
POST http://localhost:8082/api/user/feedback HTTP/1.1
Content-Type: application/json

{
    "userId" : "644261afa7c59d2ccdce2c4e",
    "name" : "Maria",
    "message" : "how can I navigate the page???"
}
// Response

{
  "feedback": {
    "user": "644261afa7c59d2ccdce2c4e",
    "name": "Maria",
    "message": "how can I navigate the page???",
    "_id": "64426c19ca95447016332f22",
    "createdAt": "2023-04-21T10:57:29.221Z",
    "__v": 0
  }
}
```

## Picture endpoints

# Share picture

method : POST
https://bloggini-backend.onrender.com/api/picture/sharePicture
Was difficult to test, don`t know if works

```
### Share picture
POST http://localhost:8082/api/picture/sharePicture HTTP/1.1
Content-Type: application/json

{
"userId" : "6440f6be5c0a8d1a47a2ebbc",
"pictureImage": "pictureData",
   "description": "A beautiful landscape",
  "comments" : "[]",
  "likes" : "[]"
}
```

### Get picture by id

method : GET
https://bloggini-backend.onrender.com/api/picture/getPicture/${pictureId}

```
GET http://localhost:8082/api/picture/getPicture/644262017c10ba22212eae57 HTTP/1.1

// Response

{
"result": "success",
"message": "Found post",
"data": {
"\_id": "644262017c10ba22212eae57",
"userId": "644261afa7c59d2ccdce2c4e",
"pictureImage": "some big encoded stuff",
"description": "A beautiful landscape",
"comments": [
{
"user": null,
"text": "Nice pic!",
"createdAt": "2023-04-21T10:14:25.089Z",
"_id": "644262017c10ba22212eae58"
}
],
"likes": [],
"createdAt": "2023-04-21T10:14:25.138Z",
"updatedAt": "2023-04-21T10:14:25.138Z",
"\_\_v": 0
}
}
```

# Get posts of all users

method : GET
https://bloggini-backend.onrender.com/api/users-posts

```

### Get posts of  users
GET   http://localhost:8082/api/users-posts  HTTP/1.1

// Response

[
  {
    "_id": "644261afa7c59d2ccdce2c4e",
    "firstName": "Maria",
    "lastName": "Glushenkova",
    "username": "maria_glushenkova",
    "password": "$2b$10$2xTfPsAa0GrwQY8swzBube4bo9hzKkWxwVVLxhCSxEFtRZ57VGtO.",
    "bio": "I am creator of this testing mode.",
    "privacyMode": 0,
    "pictures": [],
    "feedbacks": [],
    "isDeleted": false,
    "__v": 0,
    "posts": [
      {
        "_id": "644262017c10ba22212eae57",
        "userId": "644261afa7c59d2ccdce2c4e" ,
        "description": "A beautiful landscape",
        "comments": [
          {
            "user": "643fbc01bab3448131d7111d",
            "text": "Nice pic!",
            "createdAt": "2023-04-21T10:14:25.089Z",
            "_id": "644262017c10ba22212eae58"
          }
        ],
        "likes": [],
        "createdAt": "2023-04-21T10:14:25.138Z",
        "updatedAt": "2023-04-21T10:14:25.138Z",
        "__v": 0
      }
    ]
  }
]
```

# Delete picture

method : DELETE
https://bloggini-backend.onrender.com/api/picture/deletePicture/${pictureId}

```
### Delete picture
DELETE   http://localhost:8082/api/picture/deletePicture/644262017c10ba22212eae57 HTTP/1.1
```

# Like picture

method : POST
https://bloggini-backend.onrender.com/api/picture/like

```
### Like
POST http://localhost:8082/api/picture/like  HTTP/1.1
Content-Type: application/json

{
   "pictureId": "644290b88da7edec0bac0829",
    "userId" : "644298d84468748a0de500ab"
}
// Response

{
  "message": "Picture liked successfully",
  "picture": {
    "_id": "644290b88da7edec0bac0829",
    "userId": "64411b35fc94e163b94ee794",
  }
}
```

# Comment picture

method : POST
https://bloggini-backend.onrender.com/api/picture/comment

```

### Comment
POST http://localhost:8082/api/picture/comment  HTTP/1.1
Content-Type: application/json

{
   "pictureId": "644290b88da7edec0bac0829",
    "userId" : "644298d84468748a0de500ab",
    "text" : " маєш гарний сайт"
}

// Response

{
  "message": "Comment added successfully",
  "comment": {
    "user": "644298d84468748a0de500ab",
    "text": " маєш гарний сайт",
    "createdAt": "2023-04-21T14:11:09.270Z",
    "_id": "6442997d4468748a0de500b6",
    "__v": 0
  }
}
```

# Search sth

method : POST
https://bloggini-backend.onrender.com/api/search

```
### Search sth
POST http://localhost:8082/api/search HTTP/1.1
Content-Type: application/json

{
    "searchString": "maria_glushenkova"
}


{
  "result": "success",
  "data": [
    {
      "_id": "644261afa7c59d2ccdce2c4e",
      "firstName": "Maria",
      "lastName": "Glushenkova",
      "username": "maria_glushenkova",
      "pictures": []
    }
  ]
}
```
