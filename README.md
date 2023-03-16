# PuntoPiPi - Backend
Developed as the final project of our web programming bootcamp at Ironhack Barcelona.
It's a MERN Stack application, check the frontend repository [here](https://github.com/Beartoe7/PuntoPipi-Front.git).

## About
Hi! We are Roberto and Ross. We are web developers. This project constitutes a full stack application to help users find the locations and the details about public bathrooms in Barcelona.
![Project Image](https://cdn-icons-png.flaticon.com/512/194/194432.png "Project Image")

## Deployment
You can check the app fully deployed [here]().
If you wish to view the API deployment instead, check [here]().

## Installation guide
- Fork this repo
- Clone this repo 

```shell
$ cd portfolio-back
$ npm install
$ npm start
```

## Models
#### User.model.js
```js
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
  
});
```
#### Toilet.model.js
```js
const toiletSchema = new Schema({
    title: String,
    description: String,
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 10
    },
    photo: String,
    Location: String
});
```

## User roles
| Role  | Capabilities                                                                                                                               | Property       |
| :---: | ------------------------------------------------------------------------------------------------------------------------------------------ | -------------- |
| User  | Can login/logout. Can view all posts. Can create/edit/delete an original post and can comment on other user's posts                                                                      | isAdmin: false |
| Admin | Can login/logout. Can read, edit or delete any of the posts. Can create a new post. Can read all user's comments and edit or delete them. | isAdmin: true  |

## API Reference
| Method | Endpoint                  | Require                                                                   | Response (200)                               | Action                                                                     |
|:------:|----------------------------|
| GET    | /toilets                  | -                                                                         | json(response)                               | Returns an array with all the public bathrooms registered in the database. |
| POST   | /toilets/new              | const { title, description } = req.body;                                  | json({resultado: "ok"})                      | Creates a toilet object in the database.                                   |
| PUT    | /toilets/edit/:idToilet   | const { idToilet } = req.params; const { title, description } = req.body; | json(result)                                 | Edits a specified bathroom object in the database                          |
| GET    | /toilets/:idToilet        | const {idToilet} = req.params;                                            | json(result)                                 | Returns the information about the specified bathroom                       |
| DELETE | /toilets/delete/:idToilet | const {idToilet} = req.params;                                            | json({resultado: "ok"})                      | Deletes a bathroom from the database                                       |
| POST   | /auth/signup              | const { email, password, name } = req.body;                               | json({ user: user })                         | Registers the user in the database and returns the logged in user.         |
| POST   | /auth/login               | const { email, password } = req.body;                                     | json({authToken:authToken})                  | Logs in an already registered user                                         |
| GET    | /auth/verify              | -                                                                         | json(req.payload)                            | Verifies JWT stored on the client                                          |
| GET    | /user/profile             | -                                                                         | res.render("users/home", { post: myUserdb }) | Returns the current user object.                                           |