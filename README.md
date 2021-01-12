`mongodb` `#assembler-school` `#master-in-software-engineering`

# Assembler School: Node.js REST API Design Intro Workshop <!-- omit in toc -->

In this workshop you will learn how to build a REST API with Node.js, MongoDB and Mongoose.

## Table of Contents <!-- omit in toc -->

- [Getting Started](#getting-started)
- [Workshop Material](#workshop-material)
- [Dependencies](#dependencies)
- [Contents and Branches Naming Strategy](#contents-and-branches-naming-strategy)
- [Refresher](#refresher)
- [REST APIs in Node.js](#rest-apis-in-nodejs)
- [Starting the Server](#starting-the-server)
- [Defining Routes and Controllers](#defining-routes-and-controllers)
- [Getting a Single Resource](#getting-a-single-resource)
- [Creating Resources](#creating-resources)
- [Updating Resources](#updating-resources)
- [Deleting a Resource](#deleting-a-resource)
- [CRUD API Exercises](#crud-api-exercises)
- [Authentication in Node.js](#authentication-in-nodejs)
- [Firebase Auth](#firebase-auth)
- [⚠️ Security Considerations Before You Get Started](#️-security-considerations-before-you-get-started)
- [Creating a Sign Up Controller](#creating-a-sign-up-controller)
- [Password Reset with Firebase Auth](#password-reset-with-firebase-auth)
- [MongoDB Atlas](#mongodb-atlas)
- [Heroku](#heroku)
- [Resources](#resources)

## Getting Started

### The repo

First, you will need to clone the repo:

```bash
$ git clone https://github.com/assembler-school/nodejs-rest-api-design-intro-workshop.git
```

## Workshop Material

- [Slides](https://docs.google.com/presentation/d/1LlM87-YozYFv6cuU6oEPFPTqLGrumpWJ29-EaJKOq9E/edit?usp=sharing)

## Dependencies

Before we can get started you will need to make sure that all the necessary dependencies are installed in your system.

### Node.js

You can install it by following the instructions [in the official docs](https://nodejs.org/en/) (we recommend that you install the version that is named _Current_).

To verify that you have installed it correctly, you can run the following command from the terminal that should output the version installed:

```bash
$ node --version
v15.5.0
```

### MongoDB

You find the instructions on installing the MongoDB Community Server locally in the [official docs](https://www.mongodb.com/try/download/community).

To verify that you have installed it correctly, you can run the following command from the terminal which should open the mongodb shell:

```bash
$ mongo
MongoDB shell version v4.2.6
connecting to: mongodb://127.0.0.1:27017/?compressors=disabled&gssapiServiceName=mongodb
Implicit session: session { "id" : UUID("5087a5c3-90ae-4a3b-8039-4a9cec0baa21") }
MongoDB server version: 4.2.6
Server has startup warnings:
2020-11-29T08:34:35.711+0100 I  CONTROL  [initandlisten]
2020-11-29T08:34:35.712+0100 I  CONTROL  [initandlisten] ** WARNING: Access control is not enabled for the database.
2020-11-29T08:34:35.712+0100 I  CONTROL  [initandlisten] **          Read and write access to data and configuration is unrestricted.
2020-11-29T08:34:35.739+0100 I  CONTROL  [initandlisten]
---
Enable MongoDB's free cloud-based monitoring service, which will then receive and display
metrics about your deployment (disk utilization, CPU, operation statistics, etc).

The monitoring data will be available on a MongoDB website with a unique URL accessible to you
and anyone you share the URL with. MongoDB may use this information to make product
improvements and to suggest MongoDB products and deployment options to you.

To enable free monitoring, run the following command: db.enableFreeMonitoring()
To permanently disable this reminder, run the following command: db.disableFreeMonitoring()
---

>
```

### MongoDB for VS Code Extension

Furthermore, you can also install the MongoDB for VS Code extension for an easier integration inside VS Code. You can learn more in the [official docs](https://docs.mongodb.com/mongodb-vscode/).

<img src='src/img/mongo-db-for-vs-code-extension.png' width='600'>

### MongoDB Compass

For this workshop you should have installed MongoDB Compass which is the official GUI tool for working with MongoDB databases. Your can lean how to install it in the [official docs](https://www.mongodb.com/products/compass).

<img src='src/img/mongo-db-compass.png' width='600'>

### Heroku CLI

In order to be able to keep up with the workshop you will need to have previously installed the Heroku CLI.

Follow the instructions in the [official docs](https://devcenter.heroku.com/articles/heroku-cli) and make sure that it is working before the day of the workshop.

To verify that it works run the following command from the terminal:

```bash
$ heroku --version
```

### Project Dependencies

Then, you will have to install all the project dependencies with npm in the root folder:

```bash
$ npm install
```

## Contents and Branches Naming Strategy

The repository is made up of several branches that include the contents and exercises of each section.

The branches follow a naming strategy like the following:

- `{NN}-exercise`: includes the main contents and the instructions of the exercises
- `{NN}-exercise-solution`: includes the solution of the exercises

### Fetch all Branches

In order to fetch all the remote branches in the repository you can use the following command:

```bash
$ git fetch --all

# List both remote-tracking branches and local branches
$ git branch --all
```

Then, you can create a local branch based on a remote branch with the following command:

```bash
$ git checkout -b <new_branch_name> <remote_branch_name>
```

## Refresher

### Node.js MVC Folder Structure

Following the MVC pattern, this is a sample folder structure for developing backend applications using the MERN Stack.

#### What is the _MERN_ Stack?

_MERN_ stands for MongoDB, Express, React, Node, after the four key technologies that make up the stack.

- **MongoDB** - document database
- **Express.js** - Node.js web framework
- **React.js** - a client-side JavaScript framework
- **Node.js** - the premier JavaScript web server

```bash
├── ...
└── src
    ├── config
    │   └── ...\.js
    ├── controllers
    │   └── user-controller.js
    │   └── X-controller.js
    ├── db
    │   └── ...\.js
    ├── middleware
    │   └── X-middleware.js
    ├── models
    │   ├── index.js
    │   └── user-model.js
    │   └── X-model.js
    ├── routes
    │   └── user-routes.js
    │   └── X-routes.js
    ├── index.js
    └── server.js
```

### Folders Used

#### `controllers`

Where we store the controllers used in the routes. These are responsible for return a response for each endpoint, usually they connect to the DB and fetch the data from it.

#### `routes`

Where we store the routes used in the endpoints of the app.

#### `models`

Where we store the mongoose models of the app.

### Other Folder

#### `config`

Where we can store all the configuration files needed in the app.

#### `middleware`

Where we can store the middleware used in the app.

#### `db`

Where we can store the files related to the database.

#### `server.js`

The file that holds the express.js `app` exported for use in the `index.js` file and for easier testing.

#### `index.js`

### DB Design

In this workshop we will continue with the mongoose models from the previous MongoDB Intro Workshop.

The models we will use are the following:

#### User Model

```js
const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "The first name is required"],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "The last name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "The email is required"],
      trim: true,
      unique: true,
      validate: {
        validator: (value) => validator.isEmail(value),
        message: (props) => `The email ${props.value} is not valid`,
      },
    },
    password: {
      type: String,
      required: [true, "The password is required"],
      minlength: [8, "The password is too short"],
    },
    speaks: [
      {
        type: String,
        enum: [
          "english",
          "spanish",
          "catalan",
          "german",
          "italian",
          "javascript",
        ],
      },
    ],
  },
  { timestamps: true },
);
```

#### Song Model

```js
const SongSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    genre: {
      type: String,
      required: true,
      trim: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    stats: {
      type: Object,
      default: {
        timesPlayed: 0,
        upVotes: 0,
        downVotes: 0,
      },
      timesPlayed: Number,
      upVotes: Number,
      downVotes: Number,
    },
    author: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: "user",
    },
  },
  { timestamps: true },
);
```

## REST APIs in Node.js

Building a REST API with Node.js is very easy. We just need to define an endpoint with express and return a response. However, this is very limited because usually we need a database to store and retrieve data from.

But now that we know how to use Mongoose we can connect it to express so that we can perform CRUD operations with it.

## Starting the Server

As we have seen in the previous workshop, we first need to connect to the database and then we can start the express server:

```js
// src/index.js
const app = require("./server");
const config = require("./config/config");
const connect = require("./db/connect");

// uncomment if you need to seed the database before
// const { seedUsers } = require("./db/seed");

connect().then(async function onServerInit() {
  config.logger.info(`DB connected`);

  // uncomment if you need to seed the database before
  // await seedUsers();

  app.listen(config.app.PORT, () => {
    config.logger.info(`Server running at http://localhost:${config.app.PORT}`);
  });
});
```

Then, we can define a basic endpoint with express to return a response for each request:

```js
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const { json } = require("body-parser");

const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(json());

app.get("/", (req, res) => {
  res.status(200).send({
    data: "hello-world",
  });
});

module.exports = app;
```

If we make a request to the `http://localhost:4000` endpoint we should get a response:

```json
{
  "data": "hello-world"
}
```

## Defining Routes and Controllers

In order to use the MVC design pattern we can create routes and controllers in our app. First, we need to create the controllers that will responsible for responding to each request:

```js
const db = require("../models");

async function getUsers(req, res, next) {
  try {
    const users = await db.User.find({})
      .select({
        firstName: 1,
        lastName: 1,
      })
      .limit(10)
      .lean()
      .exec();

    res.status(200).send({
      data: users,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getUsers: getUsers,
};
```

Then, we need to create the router:

```js
const Router = require("express").Router;

const userController = require("../controllers/user-controller");

const UserRouter = Router();

UserRouter.get("/", userController.getUsers);

module.exports = UserRouter;
```

Then, instead of handling the response in the `server.js` file, we use the controllers that are defined as middleware in the router.

```js
app.use("/users", UserRouter);
```

Now, if we make a request to the `/users` endpoint we should see the following response:

```json
{
  "data": [
    {
      "_id": "5ff1912e6db1cb02e81694c0",
      "firstName": "Jordan",
      "lastName": "Peterson"
    },
    {
      "_id": "5ff1912e6db1cb02e81694c2",
      "firstName": "Mable",
      "lastName": "Schneider"
    },
    {
      "_id": "5ff1912e6db1cb02e81694c1",
      "firstName": "Margaret",
      "lastName": "Watkins"
    },
    {
      "_id": "5ff1912e6db1cb02e81694c3",
      "firstName": "Alta",
      "lastName": "Harris"
    },
    {
      "_id": "5ff1912e6db1cb02e81694c4",
      "firstName": "Darrell",
      "lastName": "Wilkerson"
    },
    {
      "_id": "5ff1912e6db1cb02e81694c5",
      "firstName": "Ryan",
      "lastName": "McGuire"
    }
  ]
}
```

## Getting a Single Resource

In order to get a single resource we can use route params. In this case we can get the details of a single user using the `req.params` property.

```js
// src/routes/user-routes.js
UserRouter.get("/:userId", userController.getUserDetails);
```

Then, we can define the controller that fetches the info of the user with the id that we pass.

```js
// src/routes/user-controller.js
async function getUserDetails(req, res, next) {
  const { userId } = req.params;

  try {
    const user = await db.User.findOne({
      _id: userId,
    })
      .select("-password -__v -createdAt -updatedAt")
      .lean()
      .exec();

    res.status(200).send({
      data: user,
    });
  } catch (error) {
    next(error);
  }
}
```

Then, we can make a request to the endpoint and we should see the following response:

```bash
http GET localhost:4000/users/5ffa0520791f51190117e5c7
```

```json
{
  "data": {
    "_id": "5ffa0520791f51190117e5c7",
    "email": "ba@wuf.ws",
    "firstName": "Mable",
    "lastName": "Schneider",
    "speaks": ["german", "english"]
  }
}
```

## Creating Resources

In order to create a resource we can simply define a `POST` handler and the controller that stores the information in the database.

```js
// src/routes/user-routes.js
UserRouter.post("/", userController.createUser);
```

All the information we send, in this case in json format, will be available in the `req.body` property because we are using the `express.json()` middleware.

```js
// src/routes/user-controller.js
async function createUser(req, res, next) {
  const { firstName, lastName, email, password, speaks } = req.body;

  try {
    const user = await db.User.create({
      firstName,
      lastName,
      email,
      password,
      speaks,
    });

    res.status(200).send({
      data: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        speaks: user.speaks,
      },
    });
  } catch (error) {
    next(error);
  }
}
```

Then, we can send a `POST` request with the following `JSON` data:

```json
{
  "firstName": "Jordan",
  "lastName": "Peterson",
  "email": "person_2@mail.com",
  "password": "jordan-super-password",
  "speaks": ["english", "javascript"]
}
```

And we should receive a response similar to the following:

```json
{
  "data": {
    "_id": "5ffa0c6e102cad6d84be368f",
    "firstName": "Jordan",
    "lastName": "Peterson",
    "email": "person_2@mail.com",
    "speaks": ["english", "javascript"]
  }
}
```

## Updating Resources

In order to update a resource, we can create a `PATCH` handler and controller:

```js
// src/routes/user-routes.js
UserRouter.post("/", userController.createUser);
```

```js
// src/routes/user-controller.js
async function updateUser(req, res, next) {
  const { userId } = req.params;
  const { firstName, lastName } = req.body;

  try {
    const updatedUser = await db.User.findOneAndUpdate(
      {
        _id: userId,
      },
      {
        $set: {
          firstName: firstName,
          lastName: lastName,
        },
      },
      {
        new: true,
      },
    ).select({
      firstName: 1,
      lastName: 1,
    });

    res.status(200).send({
      data: updatedUser,
    });
  } catch (error) {
    next(error);
  }
}
```

Then, if we make a request with the `PATCH` HTTP Verb and we send the following data:

```json
{
  "firstName": "dani",
  "lastName": "assembler"
}
```

We should get a response:

```json
{
  "data": {
    "_id": "5ffa0520791f51190117e5ca",
    "firstName": "dani",
    "lastName": "assembler"
  }
}
```

## Deleting a Resource

In order to delete a resource we can follow the same logic, we need to define an endpoint in the router and a controller that handles the request.

```js
// src/routes/user-routes.js
UserRouter.delete("/:userId", userController.deleteUser);
```

```js
// src/routes/user-controller.js
async function deleteUser(req, res, next) {
  const { userId } = req.params;

  try {
    const result = await db.User.deleteOne({
      _id: userId,
    }).lean();

    if (result.ok === 1 && result.deletedCount === 1) {
      res.status(200).send({
        data: "User removed",
      });
    } else {
      res.status(500).send({
        data: "User not removed",
      });
    }
  } catch (error) {
    next(error);
  }
}
```

Then, if we make a request to the endpoint with the `DELETE` verb, we should get a response if the `userId` exists in the database.

## CRUD API Exercises

In this step we will create the CRUD endpoints for a Book schema that we have created for you. You will have to create endpoints and controllers so that you can create, read, modify and delete book resources.

The schema can be found in the `src/models/book-model.js` file.

### Seeding Users and Books

Before you get started, to make sure you have enough data in the database you can execute the `async seedBooks()` function from the `src/db/seed.js` file. This will remove all existing users and books and create new ones from scratch.

You can run the `seedBooks()` function in the `index.js` file when starting the server.

### Tests Suites

The test suites for these exercises can be executed with the following script: `npm run test:01:crud-api`.

Open the files indicated bellow and read the instructions and requirements of the tests to solve them.

- Once you are done the instructor will solve each step
- If you get stuck you can find the answers in the `01-crud-api-exercises-solution` branch
- Try not to peek at the solutions and solve them with your pair programming partner
- To finish this part you have 20 minutes

### 1. Create the books CRUD controllers in the `/src/routes/book-controllers.js` file

### 2. Create the books CRUD routes in the `/src/routes/book-routes.js` file

- **Test suite:** "books crud controllers"

## Authentication in Node.js

Although there are many ways to implement authentication in a Node.js server, most of them are based on sessions ore JWT’s.

In this workshop we will use JWT auth because it’s stateless and easier to setup.

JWT Providers and ways to implement authentication in a Node.js server:

- Passport.js
- npm i jsonwebtoken express-jwt
- Auth0
- ...

### Drawbacks of Using a Custom JWT Auth Setup

- easy to get wrong
- a lot of boilerplate code
- many ways to do the same thing
- you need to maintain it
- adding new authentication methods is hard

### The Client Side React.js App

Before we get started, you will need to clone the following app from Github.

This is a small app built with React.js so that you can try out the sign up and login features of the workshop.

You can clone the repo from the following url:

```bash
https://github.com/assembler-school/nodejs-rest-api-design-intro-workshop-client.git
```

### Firebase Auth

<img src='src/img/fb-auth-logo.png' width='300'>

An easier and more scalable solution is to use Firebase Auth.

- easy to setup
- easy to add different authentication methods
- great documentation
- no maintenance

## Firebase Auth

---

## ⚠️ Security Considerations Before You Get Started

<p style="color:red;">

> Before you create the account make sure that you use a Gmail account that has a **strong password**, with **2FA authentication enabled** and with **no credit card added**.

</p>

---

### Getting Started

In order to get started, you will need to create an account.

Go to the following url: `https://firebase.google.com/` and click on the `Get Started` button. This will ask you to create an account and then you will be able to create a Firebase project.

<img src='src/img/fb-get-started.png' width='600'>

Once you have signed in you will be able to create a new project by clicking on `Add project`.

<img src='src/img/fb-create-project.png' width='600'>

Then, you will see the following wizard to create the project.

<img src='src/img/fb-create-step-1.png' width='600'>

In the second step you can disable analytics because we won't need it in this project.

<img src='src/img/fb-create-step-2.png' width='600'>

Then, you should see a screen similar to the following:

<img src='src/img/fb-create-step-3.png' width='600'>

Once the project was created, click on `Continue`

<img src='src/img/fb-create-step-4.png' width='600'>

---

## Congrats! 🎉 <!-- omit in toc -->

You have just created your first Firebase project.

---

### Building a Firebase Web App

For the next step we need to create an app. Firebase can be used in the web, Android or iOS apps, but in this case we will use it in a web app.

To continue, you will need to click on `web` button.

<img src='src/img/fb-project-done.png' width='600'>

This will open a wizard to create the project.

<img src='src/img/fb-web-01.png' width='600'>

To continue click on `Register App`.

This will finish the creation process and give you the keys and project config you will need to get started.

<img src='src/img/fb-web-02.png' width='600'>

---

Copy the `firebaseConfig` object and save it in the `src/firebase/firebase.js` file of the Client Side App bellow the following comment.

```js
// Paste your config object here ⬇️
const firebaseConfig = {
  // config from the firebase dashboard
};
```

Then you will be able to access the Firebase console by clicking the `Continue to console` button.

### Enabling Firebase Auth Authentication

To enable the Firebase Auth for your app you will need to click on the `Build` and `Authentication` tabs in the sidebar UI.

<img src='src/img/fb-auth-tab.png' width='600'>

And by clicking on the `Get Started` button you will redirected to the Firebase Auth dashboard.

<img src='src/img/fb-auth-dashboard.png' width='600'>

#### Email/Password Auth Method

In order to be able to allow users to login with their email and password you will need to enable the `Email/Password` auth method.

<img src='src/img/fb-auth-email.png' width='600'>

If you also need to use the Google Auth Pop Up you will need to enable the `Google` option.

For this method you will need to add the email you created the Firebase account with as the support email.

<img src='src/img/fb-auth-google.png' width='600'>

Then, click save on both methods and you now have enabled the email/password and Google authentication methods for your app.

<img src='src/img/fb-auth-enabled.png' width='600'>

### Running the Client App

In order to start the client app, open the repo with your code editor and run the `npm run start` script. This should start the React App Dev Server and a tab in your browser that you can connect to the React app to the following url: `http://localhost:3000/`.

### Adding Firebase Admin to the Node.js Backend

In order to use the Firebase Admin SDK in our Node.js app we first need to install it:

```bash
npm install firebase-admin
```

Then, you will need to create a service account that you will have to use to connect to Google Services.

To do so, open the project settings of the project you just created before.

<img src='src/img/fb-project-settings.png' width='600'>

Then click on `Generate new private key` to create a key and the download button.

<img src='src/img/fb-new-private-key.png' width='600'>

<img src='src/img/fb-download-private-key.png' width='600'>

This will download a `.json` file with the keys you will need to use in the Node.js app to identify yourself in the Google Cloud services.

#### **This json file is very important and it is very sensitive.**

⚠️ You should make sure that the file can't be accessed by anyone else but yourself. If other people have access to it they might use it on your behalf and you might receive a large bill by the end of the month.

> ⚠️ DO NOT INCLUDE IT IN THE GIT REPOSITORY

> ⚠️ IT SHOULD NOT BE PUBLIC TO ANYONE

Therefore, to securely use the keys from the service account, you can copy and store each key in an `.env` file. This way you can use it locally and once we know how to deploy the server online we will also use this information.

#### Storing the Keys in an `.env` File

First, you will need to create an `.env` file and store each key of the service account `.json` file as a new entry.

The `.env` file should be stored in the root folder of the project.

```bash
.
├── README.md
├── package.json
├── src
├── ...
└── .env
```

Your `.env` file should look similar to this with the values of each key set to the one from your service account —mine are removed so that they can't be used by others.

> ⚠️ NEVER SHARE YOUR API KEYS WITH ANYONE

#### ⚠️ Important

The `FB_CERT_PRIVATE_KEY` must be wrapped in double quotes, otherwise you will get an error from firebase.

```bash
FirebaseAppError: Failed to parse private key: Error: Invalid PEM formatted message.
```

```bash
TYPE = service_account
PROJECT_ID = --------------------
PRIVATE_KEY_ID = --------------------
PRIVATE_KEY = "-----BEGIN PRIVATE KEY-----\blabla\n-----END PRIVATE KEY-----\n"
CLIENT_EMAIL = --------------------
CLIENT_ID = --------------------
AUTH_URI = https://accounts.google.com/o/oauth2/auth
TOKEN_URI = https://oauth2.googleapis.com/token
AUTH_PROVIDER_X_509_CERT_URL = https://www.googleapis.com/oauth2/v1/certs
CLIENT_X_509_CERT_URL = https://www.googleapis.com/robot/v1/metadata/x509/--------------------
```

These values are used in the `src/config/config.js` file which is responsible for storing all the config info of our app.

```diff
diff --git a/src/00-workshop-demo-files/config/config.js b/src/00-workshop-demo-files/config/config.js
index 916491d..a785403 100644
--- a/src/00-workshop-demo-files/config/config.js
+++ b/src/00-workshop-demo-files/config/config.js
@@ -12,6 +12,9 @@ const CONFIG = {
     app: {
       PORT: process.env.PORT || 4000,
     },
+    client: {
+      URL: process.env.CLIENT_URL || "http://localhost:3000",
+    },
     logger: {
       warn: logger.warn,
       info: logger.info,
@@ -22,11 +25,29 @@ const CONFIG = {
     db: {
       url: process.env.DB_URL,
     },
+    firebase: {
+      certConfig: {
+        type: process.env.FB_CERT_TYPE,
+        project_id: process.env.FB_CERT_PROJECT_ID,
+        private_key_id: process.env.FB_CERT_PRIVATE_KEY_ID,
+        private_key: process.env.FB_CERT_PRIVATE_KEY,
+        client_email: process.env.FB_CERT_CLIENT_EMAIL,
+        client_id: process.env.FB_CERT_CLIENT_ID,
+        auth_uri: process.env.FB_CERT_AUTH_URI,
+        token_uri: process.env.FB_CERT_TOKEN_URI,
+        auth_provider_x509_cert_url:
+          process.env.FB_CERT_AUTH_PROVIDER_X_509_CERT_URL,
+        client_x509_cert_url: process.env.FB_CERT_CLIENT_X_509_CERT_URL,
+      },
+    },
   },
   development: {
     app: {
       PORT: process.env.PORT || 4000,
     },
+    client: {
+      URL: process.env.CLIENT_URL || "http://localhost:3000",
+    },
     logger: {
       warn: logger.warn,
       info: logger.info,
@@ -37,11 +58,29 @@ const CONFIG = {
     db: {
       url: process.env.DB_URL,
     },
+    firebase: {
+      certConfig: {
+        type: process.env.FB_CERT_TYPE,
+        project_id: process.env.FB_CERT_PROJECT_ID,
+        private_key_id: process.env.FB_CERT_PRIVATE_KEY_ID,
+        private_key: process.env.FB_CERT_PRIVATE_KEY,
+        client_email: process.env.FB_CERT_CLIENT_EMAIL,
+        client_id: process.env.FB_CERT_CLIENT_ID,
+        auth_uri: process.env.FB_CERT_AUTH_URI,
+        token_uri: process.env.FB_CERT_TOKEN_URI,
+        auth_provider_x509_cert_url:
+          process.env.FB_CERT_AUTH_PROVIDER_X_509_CERT_URL,
+        client_x509_cert_url: process.env.FB_CERT_CLIENT_X_509_CERT_URL,
+      },
+    },
   },
   test: {
     app: {
       PORT: process.env.PORT || 4000,
     },
+    client: {
+      URL: process.env.CLIENT_URL || "http://localhost:3000",
+    },
     logger: {
       warn: logger.warn,
       info: logger.info,
@@ -52,6 +91,21 @@ const CONFIG = {
     db: {
       url: process.env.DB_URL,
     },
+    firebase: {
+      certConfig: {
+        type: process.env.FB_CERT_TYPE,
+        project_id: process.env.FB_CERT_PROJECT_ID,
+        private_key_id: process.env.FB_CERT_PRIVATE_KEY_ID,
+        private_key: process.env.FB_CERT_PRIVATE_KEY,
+        client_email: process.env.FB_CERT_CLIENT_EMAIL,
+        client_id: process.env.FB_CERT_CLIENT_ID,
+        auth_uri: process.env.FB_CERT_AUTH_URI,
+        token_uri: process.env.FB_CERT_TOKEN_URI,
+        auth_provider_x509_cert_url:
+          process.env.FB_CERT_AUTH_PROVIDER_X_509_CERT_URL,
+        client_x509_cert_url: process.env.FB_CERT_CLIENT_X_509_CERT_URL,
+      },
+    },
   },
 };
```

Then, to use the service account and create an instance of the Firebase Admin SDK in your Node.js app you will have to complete the code of the `src/firebase/firebase.js` file.

```js
// src/firebase/firebase.js
const admin = require("firebase-admin");

const config = require("../config/config");

admin.initializeApp({
  credential: admin.credential.cert(config.firebase.certConfig),
});

const auth = admin.auth();

module.exports = {
  admin: admin,
  auth: auth,
};
```

#### Adding Authentication on the User Endpoints

So far, anyone can make requests to our app, which is not very safe. But now that we have firebase auth enabled we can create a middleware that checks if the user is signed in.

First, lets create the auth middleware in the `src/middleware` folder.

```js
// src/middleware/auth-middleware.js
const { auth } = require("../firebase/firebase");

async function authMiddleware(req, res, next) {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    // the authorization token is coming in as:
    // Bearer eyJhb.....
    const bearerToken = req.headers.authorization.substr(7);

    try {
      const userClaims = await auth.verifyIdToken(bearerToken);

      const { email, uid } = userClaims;

      req.user = {
        email: email,
        uid: uid,
      };

      next();
    } catch (error) {
      next(error);
    }
  } else {
    return res.status(401).send({
      data: null,
      error: "Unauthorized",
    });
  }
}

module.exports = {
  authMiddleware: authMiddleware,
};
```

The most important parts here are:

- `req.headers.authorization`: the token will be received as a `Bearer` token which will include the JWT sent from the Firebase Auth Client SDK
- `auth.verifyIdToken(bearerToken)`: this method from the Auth Admin SDK can be used to verify if the token is valid. If not, it will throw an error which you can catch and return a response.

Then, we can use this auth middleware for any endpoint that we want to protect. In this case, lets protect all the `/users` endpoints so that only authenticated users can make requests.

To do so, we will need to add the `authMiddleware` to the endpoint.

```js
// src/routes/user-routes.js
const Router = require("express").Router;

const { authMiddleware } = require("../middleware/auth-middleware");
const userController = require("../controllers/user-controller");

const UserRouter = Router();

// A shorter way of using auth for all the endpoints controlled
// by this router is to define the auth middleware on it
// instead of on each route handler
UserRouter.use("/users", authMiddleware);

UserRouter.get("/users", userController.getUsers);
UserRouter.get("/users/:userId", userController.getUserDetails);
UserRouter.post("/users", userController.createUser);
UserRouter.patch("/users/:userId", userController.updateUser);
UserRouter.delete("/users/:userId", userController.deleteUser);

module.exports = UserRouter;
```

```diff
diff --git a/src/00-workshop-demo-files/routes/user-routes.js b/src/00-workshop-demo-files/routes/user-routes.js
index c9b9ace..ebb1040 100644
--- a/src/00-workshop-demo-files/routes/user-routes.js
+++ b/src/00-workshop-demo-files/routes/user-routes.js
@@ -1,13 +1,18 @@
 const Router = require("express").Router;

+const { authMiddleware } = require("../middleware/auth-middleware");
 const userController = require("../controllers/user-controller");

 const UserRouter = Router();

-UserRouter.get("/", userController.getUsers);
-UserRouter.get("/:userId", userController.getUserDetails);
-UserRouter.post("/", userController.createUser);
-UserRouter.patch("/:userId", userController.updateUser);
-UserRouter.delete("/:userId", userController.deleteUser);
+UserRouter.use("/users", authMiddleware);
+
+UserRouter.get("/users", userController.getUsers);
+UserRouter.get("/users/:userId", userController.getUserDetails);
+UserRouter.post("/users", userController.createUser);
+UserRouter.patch("/users/:userId", userController.updateUser);
+UserRouter.delete("/users/:userId", userController.deleteUser);

 module.exports = UserRouter;
```

Then, we need to adjust our `src/server.js` file so that it uses the User Router as a middleware instead of a controller on the `/users` endpoint.

Furthermore, we also use the `cors` middleware package that enables us to make requests from the `http://localhost:3000` endpoint on our client app to avoid CORS issues.

First, we will need to install the package:

```bash
$ npm install cors
```

In this case, we are using the `config` object to store the `client.URL` to avoid hard coding the URL in our code.

```js
// src/server.js
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const { json } = require("body-parser");
const cors = require("cors");

const userRouter = require("./routes/user-routes");
const config = require("./config/config");

const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(json());
app.use(
  cors({
    origin: config.client.URL,
  }),
);

app.use(userRouter);

module.exports = app;
```

```diff
 const helmet = require("helmet");
 const morgan = require("morgan");
 const { json } = require("body-parser");
+const cors = require("cors");

-const UserRouter = require("./routes/user-routes");
+const userRouter = require("./routes/user-routes");
+const config = require("./config/config");

 const app = express();

 app.use(morgan("dev"));
 app.use(helmet());
 app.use(json());
+app.use(
+  cors({
+    origin: config.client.URL,
+  }),
+);

-app.use("/users", UserRouter);
+app.use(userRouter);

 module.exports = app;
```

Now, each time someone makes a request to the endpoint, if they are not logged in the will receive a `401` Status Code.

```bash
$ http localhost:4000/users
HTTP/1.1 401 Unauthorized

{
  "data": null,
  "error": "Unauthorized"
}
```

But if we make a request from the Client app after logging in, we should see the response if we include the token and log the `userClaims` object returned by the `auth.verifyIdToken()` method from the Firebase Admin Auth SDK.

```js
// src/middleware/auth-middleware.js
const { auth } = require("../firebase/firebase");

async function authMiddleware(req, res, next) {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    // the authorization token is coming in as:
    // Bearer eyJhb.....
    const bearerToken = req.headers.authorization.substr(7);

    try {
      const userClaims = await auth.verifyIdToken(bearerToken);

      const { email, uid } = userClaims;

      req.user = {
        email: email,
        uid: uid,
      };

      next();
    } catch (error) {
      next(error);
    }
  } else {
    return res.status(401).send({
      data: null,
      error: "Unauthorized",
    });
  }
}

module.exports = {
  authMiddleware: authMiddleware,
};
```

```json
{
  "name": "Dani Lucaci",
  "picture": "https://lh3.googleusercontent.com/image_url",
  "iss": "https://securetoken.google.com/firebase-app",
  "aud": "firebase-app",
  "auth_time": 1610573392,
  "user_id": "9UIE7kZJPhRm9b49W8dajs6bH3leB3",
  "sub": "9UIE7kZJPhRm9b49Wtj86bH3leB3",
  "iat": 1610731903,
  "exp": 1610735503,
  "email": "dani@mail.com",
  "email_verified": true,
  "firebase": {
    "identities": { "google.com": [Array], "email": [Array] },
    "sign_in_provider": "google.com"
  },
  "uid": "9UIE7kZJPhRm9b49W8dajs6bH3leB3"
}
```

Furthermore, we also assign the users `uid` and `email` in the `request` object from express so that the next middleware has access to the current user logged in.

```js
req.user = {
  email: email,
  uid: uid,
};
```

#### Login And Sign Up with Firebase Auth

Now that we have included the Firebase Auth we need to change a couple of things in our User Model. Since now the user is created with Firebase, the `password` will no longer need to be stored in our database. We can still use the `id` to identify the user in MongoDB but the Mongo `_id` will now have to be created based on the `id` from Firebase Auth.

Furthermore, the `email` can also be obtained from the user claims returned by Firebase Auth.

If we modify the User Schema to reflect the changes we can see that the we define the `_id` as a String because its coming from Firebase. Moreover, the `password` and related methods are no longer needed because that logic is now in the hands of Firebase.

We also don't need to define the `_id` as `unique` because MongoDB already creates it as unique.

Other notable changes include the fact that the `firstName` and `lastName` fields are no longer `required` since in our _Sign Up_ or _Login_ forms we are not requiring them.

> If we create a user without these fields they will just not be part of the document.

---

<img src='src/img/client-side-sign-up-form.png' width='600'>

---

```js
// src/models/user-model.js
// Our new user schema
const mongoose = require("mongoose");
const validator = require("validator");

const UserSchema = new mongoose.Schema(
  {
    _id: String,
    firstName: {
      type: String,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "The email is required"],
      trim: true,
      unique: true,
      validate: {
        validator: (value) => validator.isEmail(value),
        message: (props) => `The email ${props.value} is not valid`,
      },
    },
    speaks: [
      {
        type: String,
        enum: [
          "english",
          "spanish",
          "catalan",
          "german",
          "italian",
          "javascript",
        ],
      },
    ],
  },
  { timestamps: true },
);

const UserModel = new mongoose.model("user", UserSchema);

module.exports = UserModel;
```

```diff
diff --git a/src/00-workshop-demo-files/models/user-model.js b/src/00-workshop-demo-files/models/user-model.js
index d3655c1..921d7aa 100644
--- a/src/00-workshop-demo-files/models/user-model.js
+++ b/src/00-workshop-demo-files/models/user-model.js
@@ -1,17 +1,15 @@
 const mongoose = require("mongoose");
 const validator = require("validator");
-const bcrypt = require("bcrypt");

 const UserSchema = new mongoose.Schema(
   {
+    _id: String,
     firstName: {
       type: String,
-      required: [true, "The first name is required"],
       trim: true,
     },
     lastName: {
       type: String,
-      required: [true, "The last name is required"],
       trim: true,
     },
     email: {
@@ -24,11 +22,6 @@ const UserSchema = new mongoose.Schema(
         message: (props) => `The email ${props.value} is not valid`,
       },
     },
-    password: {
-      type: String,
-      required: [true, "The password is required"],
-      minlength: [8, "The password is too short"],
-    },
     speaks: [
       {
         type: String,
@@ -46,24 +39,6 @@ const UserSchema = new mongoose.Schema(
   { timestamps: true },
 );

-UserSchema.pre("save", async function passwordPreSave(next) {
-  if (!this.isModified("password")) {
-    return next();
-  }
-
-  try {
-    const hash = await bcrypt.hash(this.password, 12);
-    this.password = hash;
-    return next();
-  } catch (error) {
-    return next(error);
-  }
-});
-
-UserSchema.methods.comparePassword = function comparePassword(candidate) {
-  return bcrypt.compare(candidate, this.password);
-};
-
 const UserModel = new mongoose.model("user", UserSchema);

 module.exports = UserModel;
```

With these changes, we need to adjust our User CRUD controllers because they are still using the previous User Schema so they will fail after the current changes.

We can also uninstall the bcrypt package since we no longer using it:

```bash
npm uninstall bcrypt
```

### PR Welcome

`@TODO: Update the controllers and tests`

## Creating a Sign Up Controller

With all these changes we are now ready to implement our Sign Up controller that will be used to store the user in our MongoDB database.

We will need to follow these steps:

1. Create a `signUp()` controller for the `/sign-up` endpoint
2. Create a `/sign-up` endpoint that will be called when users sign up or login

This endpoint will only store in the database the new users: `id` and `email` since everything else is not entered in the login or sign up forms.

If we need to add other information we can define a profile endpoint that can `PATCH` the user info.

The important parts here are the check to see if the user already exists before storing it in the DB. If it does, we just return a `200` response, otherwise we create the new user from the `req.user` object that the `authMiddleware` added.

```diff
diff --git a/src/00-workshop-demo-files/controllers/user-controller.js b/src/00-workshop-demo-files/controllers/user-controller.js
index 093ab22..261462c 100644
--- a/src/00-workshop-demo-files/controllers/user-controller.js
+++ b/src/00-workshop-demo-files/controllers/user-controller.js
@@ -1,9 +1,17 @@
 const db = require("../models");
 const { logger } = require("../config/config");

+async function signUp(req, res, next) {
+  const { uid, email } = req.user;
+
+  try {
+    const user = await db.User.findOne({ email: email });
+
+    if (user) {
+      return res.sendStatus(200);
+    }
+
+    const newUser = await db.User.create({
+      _id: uid,
+      email: email,
+    });
+
+    logger.debug(newUser);
+
+    res.sendStatus(201);
+  } catch (error) {
+    next(error);
+  }
+}
+
 module.exports = {
   getUsers: getUsers,
   getUserDetails: getUserDetails,
   createUser: createUser,
   updateUser: updateUser,
   deleteUser: deleteUser,
+  signUp: signUp,
 };
```

Then, we need to define the Route handler in the `user-routes` file.

```diff
diff --git a/src/00-workshop-demo-files/routes/user-routes.js b/src/00-workshop-demo-files/routes/user-routes.js
index c9b9ace..b3b98a2 100644
--- a/src/00-workshop-demo-files/routes/user-routes.js
+++ b/src/00-workshop-demo-files/routes/user-routes.js
@@ -1,13 +1,21 @@
UserRouter.patch("/users/:userId", userController.updateUser);
UserRouter.delete("/users/:userId", userController.deleteUser);
+
+UserRouter.post("/sign-up", authMiddleware, userController.signUp);

 module.exports = UserRouter;
```

This endpoint will be called from our client app when we login or sign up.

```js
export async function syncUserData() {
  const userToken = await getCurrentUserToken();

  return axios({
    method: "POST",
    url: "http://localhost:4000/sign-up",
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
}
```

After completing all these steps, if we try to login or sign up from the client app we should see that a new user is created:

```bash
{
  speaks: [],
  _id: '8hTNmTB176XgXz0PRA6slwId3m22',
  email: 'dani4@mail.com',
  createdAt: 2021-01-16T09:19:02.164Z,
  updatedAt: 2021-01-16T09:19:02.164Z,
  __v: 0
}

POST /sign-up 201 20.578 ms - 7
```

Then, if we open the Firebase Auth Dashboard we can see a list of the users that have sign in with our app.

<img src='src/img/firebase-auth-users-list.png' width='600'>

## Password Reset with Firebase Auth

In order to allow users to change their passwords we can use the `auth.sendPasswordResetEmail(email)` from the Firebase Auth Client SDK which will send an email with the password reset instructions.

---

<img src='src/img/password-reset-form-link.png' width='600'>

---

<img src='src/img/password-reset-form-send.png' width='600'>

---

<img src='src/img/password-reset-email.png' width='600'>

---

<img src='src/img/password-reset-action.png' width='600'>

---

Now we can login with the new password.

## MongoDB Atlas

So far, we have stored the data in the MongoDB DB locally. But this won't work if we want to deploy our app.

```bash
mongodb://localhost:27017/workshop-db
```

In order to host a MongoDB DB we can use the MongoDB Atlas service.

<img src='src/img/mongodb-atlas-homepage.png' width='600'>

---

To get started, create an account and then sign in.

<img src='src/img/mongodb-atlas-signup.png' width='600'>

---

Then, click on the `Build a cluster` button to create a new cluster.

<img src='src/img/mongodb-atlas-build-cluster.png' width='600'>

---

Choose the `Free` plan.

<img src='src/img/mongodb-atlas-free-cluster.png' width='600'>

---

Choose the AWS Provider, and the Ireland region.

<img src='src/img/mongodb-atlas-region-provider.png' width='600'>

---

Make sure to choose the M0 Free tier.

<img src='src/img/mongodb-atlas-free-tier.png' width='600'>

---

Then, as an optional step you can change the cluster name.

<img src='src/img/mongodb-atlas-cluster-name.png' width='600'>

---

Then, click on `Create cluster` to go to the next step and wait for the cluster to finish building.

<img src='src/img/mongodb-atlas-cluster-wait-build.png' width='600'>

---

Once the cluster is created we can click on connect.

<img src='src/img/mongodb-atlas-cluster-done.png' width='600'>

<img src='src/img/mongodb-atlas-cluster-connect.png' width='600'>

---

Click on `Copy` and now you can use the connection string in the Node.js app.

<img src='src/img/mongodb-atlas-cluster-copy.png' width='600'>

---

You will have to replace the `username` and `password` with the ones of your account. Since this is sensitive information you should use env variables.

```js
mongodb+srv://<username>:<password>@workshop-cluster.ul0ax.mongodb.net/<dbname>?retryWrites=true&w=majority
```

### Storing the Credentials in `.env` Variables

Open the `Database Access` tab and create a user that will be able to connect to the Database. Once created, copy the `username` and `password` to store them in an `.env` file.

<img src='src/img/mongodb-atlas-cluster-user-create.png' width='600'>

---

<img src='src/img/mongodb-atlas-password-auth.png' width='600'>

---

Choose the `readAndWriteToAnyDatabase` permissions.

<img src='src/img/mongodb-atlas-permissions.png' width='600'>

---

And click on `Create` to finish creating the user.

<img src='src/img/mongodb-atlas-user-created.png' width='600'>

---

Then, we need to add an IP Address so that we can connect to the server.

Click on the `Network Access` tab and then on `Add IP Address`.

<img src='src/img/mongodb-atlas-add-ip-address.png' width='600'>

---

Click on `Allow from anywhere`

<img src='src/img/mongodb-atlas-allow-from-anywhere.png' width='600'>

---

Then wait for the ip to be created

<img src='src/img/mongodb-atlas-ip-done.png' width='600'>

---

Then, open the `.env` file and create the following entries that contain the `username` and `password` of your account.

```bash
MONGODB_USERNAME="username"
MONGODB_PASSWORD="password"
```

### Connecting to the MongoDB Atlas DB

Open the `src/config/config.js` file and enter the DB URL.

```js
url: `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@workshop-cluster.ul0ax.mongodb.net/workshop-db-prod?retryWrites=true&w=majority`,
```

```diff
diff --git a/src/00-workshop-demo-files/config/config.js b/src/00-workshop-demo-files/config/config.js
index a785403..03f79e8 100644
--- a/src/00-workshop-demo-files/config/config.js
+++ b/src/00-workshop-demo-files/config/config.js
@@ -23,7 +23,7 @@ const CONFIG = {
       debug: logger.debug,
     },
     db: {
-      url: process.env.DB_URL,
+      url: `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@workshop-cluster.ul0ax.mongodb.net/workshop-db-prod?retryWrites=true&w=majority`,
     },
     firebase: {
       certConfig: {
@@ -56,7 +56,7 @@ const CONFIG = {
       debug: logger.debug,
     },
     db: {
-      url: process.env.DB_URL,
+      // url: `mongodb://localhost:27017/workshop-db-dev`,
+      url: `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@workshop-cluster.ul0ax.mongodb.net/workshop-db-dev?retryWrites=true&w=majority`,
     },
     firebase: {
       certConfig: {
@@ -89,7 +89,7 @@ const CONFIG = {
       debug: logger.debug,
     },
     db: {
-      url: process.env.DB_URL,
+      url: `mongodb://localhost:27017/workshop-db-test`,
     },
     firebase: {
       certConfig: {
(END)
```

Then, you should use the URL in the `connect` method.

```js
const mongoose = require("mongoose");
const config = require("../config/config");

function connect() {
  return mongoose.connect(config.db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });
}

module.exports = connect;
```

If everything went fine, we should now try to create a new user from the Client app which should appear in the Atlas DB.

---

<img src='src/img/mongodb-atlas-collections.png' width='600'>

---

## Heroku

So far we have seen how to create a server, add authentication and then use a Production ready MongoDB provider.

Now it is time to deploy our Node.js App and for this we will use Heroku.

### What is Heroku

Heroku is a cloud platform that lets companies build, deliver, monitor and scale apps without having to create our own physical servers. We simply use their hardware infrastructure and deploy our apps on them.

### Features

#### Built For Continuous Integration And Delivery

Deploy from Git, GitHub, or Docker, or using an API.

#### Simple Horizontal And Vertical Scalability

Easily scale apps in a single click with no downtime.

#### The CLI

Heroku has an incredible Command Line Interface to help us to manage and control our applications on it. Commands like `heroku logs` will be your best friends when you use them.

#### Multi-Language Support

Run multiple languages, like Node, Ruby, Java, Clojure, Scala, Go, Python, and PHP all from the same platform.

#### Trusted Application Operations

Heroku has as main option git-based deployment. You can "link" your app directly from GitHub and enable default deployment each time when you push some code into `main`.

### Getting Started With Heroku

First, make sure that you have the cli installed. In not, read the instructions at the begging of this `README`.

```bash
$ heroku --version
```

#### Creating an Heroku Account

First, you will need to create an account in the [Heroku web page](https://signup.heroku.com/login).

<img src='src/img/heroku-sign-up.png' width='600'>

---

Then, you will need to login with the heroku cli:

```bash
$ heroku login
 ›   Warning: heroku update available from 7.47.6 to 7.47.7.
heroku: Press any key to open up the browser to login or q to exit:
Opening browser to https://cli-auth.heroku.com/auth/cli/browser/XXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
heroku: Waiting for login... ⣾

```

This will open a tab in your browser so that you can login:

<img src='src/img/heroku-login-init.png' width='600'>

---

<img src='src/img/heroku-login-done.png' width='600'>

---

If everything went fine you should see the result in the terminal:

```bash
Logging in... done
Logged in as dani@mail.com
```

#### Creating Our First Heroku App

Now that we have logged in, we can create an app with the Heroku CLI.

```bash
 heroku create dani-assembler-demo-app
Creating ⬢ dani-assembler-demo-app... done
https://dani-assembler-demo-app.herokuapp.com/ | https://git.heroku.com/dani-assembler-demo-app.git
```

If you get an error it's because Heroku app names are globally available which means that they have to be globally unique. If another app exists in the Heroku domains it will fail.

```bash
 Name workshop-app is already taken
```

> An easy trick is to use a namespace for each app

```bash
<your-name>-<app-name>
```

---

Then, if we open the Heroku dashboard we should see our app.

<img src='src/img/heroku-app-done.png' width='600'>

---

### Storing the `.env` Variables in Heroku

Before we deploy the app we first need to configure all the environment variables we were using.

In Heroku can do so in 2 ways:

1. in the dashboard in the config of the app
2. using the command line

##### Setting Env Variables in the Heroku dashboard

<img src='src/img/heroku-env-vars-dashboard.png' width='600'>

##### Setting Env Variables in the Heroku CLI

We can set an env variable with `heroku config:set ENV_VAR_NAME=value`.

```bash
$ heroku config:set FB_CERT_TYPE=service_account
Setting FB_CERT_TYPE and restarting ⬢ dani-assembler-demo-app... done, v3
FB_CERT_TYPE: service_account
```

Then we can access the same config var with `heroku config:get ENV_VAR_NAME`

```bash
$ heroku config:get FB_CERT_TYPE
service_account
```

Once have have set all the environment variables we can start deploying the app.

First, if we look at the remotes we currently have:

```bash
$ git remote -v

heroku  https://git.heroku.com/dani-assembler-demo-app.git (fetch)
heroku  https://git.heroku.com/dani-assembler-demo-app.git (push)
```

We can see that we have a new `heroku` git remote that was created for use when we used the `heroku create` CLI command. We can push to this remote to deploy a new version of our app.

#### Important Things to Know Before We Deploy

- Heroku will use the `start` script from our `package.json` file to build the server when we deploy it
- it will set the `NODE_ENV` environment variable to `production`
- it can be configured to run other scripts if we need to optimize the build, you can learn more in the docs

So we need to add a `start` npm script:

```diff
diff --git a/package.json b/package.json
index 41acbbb..9bfcea5 100644
--- a/package.json
+++ b/package.json
@@ -13,7 +13,8 @@
     "dev:workshop": "nodemon src/00-workshop-demo-files/index.js",
     "dev": "nodemon src/index.js",
     "test": "jest --watch",
-    "test:01:crud-api": "jest -t 'books crud controllers' --watch"
+    "test:01:crud-api": "jest -t 'books crud controllers' --watch",
+    "start": "node src/index.js"
   },
   "repository": {
     "type": "git",
```

#### Specifying a Node.js Version

You should always specify the Node.js version that matches the runtime you’re developing and testing with.

To find your version locally:

```bash
$ node --version
v14.15.4
```

Then, include it in the `package.json` file:

```json
{
  "private": "true",
  "main": "src/index.js",
  "engines": {
    "node": "14.x"
  }
}
```

As a last step before we deploy the app, we can update the book schema and controllers so that they don't have a user relation so that we can use it to demo making a request to the deployed api.

```diff
diff --git a/src/controllers/book-controller.js b/src/controllers/book-controller.js
index 1c55a6d..96a1e13 100644
--- a/src/controllers/book-controller.js
+++ b/src/controllers/book-controller.js
@@ -36,12 +36,11 @@ const { logger } = require("../config/config");
  * with the error object that is caught
  */
 async function createBook(req, res, next) {
-  const { title, author, genre, year, pages } = req.body;
+  const { title, genre, year, pages } = req.body;

   try {
     const book = await db.Book.create({
       title: title,
-      author: author,
       genre: genre,
       year: year,
       pages: pages,
@@ -125,13 +124,6 @@ async function getSingleBook(req, res, next) {
         title: 1,
         pages: 1,
       })
-      .populate({
-        path: "author",
-        select: {
-          firstName: 1,
-          lastName: 1,
-        },
-      })
       .lean()
       .exec();
```

```diff
diff --git a/src/models/book-model.js b/src/models/book-model.js
index 9f22c96..980261a 100644
--- a/src/models/book-model.js
+++ b/src/models/book-model.js
@@ -6,11 +6,6 @@ const BookSchema = new mongoose.Schema({
     required: true,
     trim: true,
   },
-  author: {
-    type: mongoose.SchemaTypes.ObjectId,
-    required: true,
-    ref: "user",
-  },
   genre: {
     type: String,
     required: true,
```

---

We also need to adjust our `seed()` methods that are used to create books:

---

```diff
diff --git a/src/db/seed.js b/src/db/seed.js
index 41a306b..d0a894e 100644
--- a/src/db/seed.js
+++ b/src/db/seed.js
@@ -9,16 +9,8 @@ async function seedUsers() {
 }

 async function seedBooks() {
-  await Promise.all([db.User.deleteMany({}), db.Book.deleteMany({})]);
-
-  const users = await db.User.insertMany([...getSeedUsers()]);
-  const userIds = users.map((user) => user._id);
-  const booksWithAuthors = [...getSeedBooks()].map((book) => ({
-    ...book,
-    author: getRandomItem(userIds),
-  }));
-
-  return db.Book.insertMany(booksWithAuthors);
+  await db.Book.deleteMany({});
+  return db.Book.insertMany(getSeedBooks());
 }

 function getRandomItem(arr = []) {
```

```diff
diff --git a/src/db/seed-data.js b/src/db/seed-data.js
index 86a19a4..b5fa0c6 100644
--- a/src/db/seed-data.js
+++ b/src/db/seed-data.js
@@ -49,70 +49,60 @@ function getSeedBooks() {
   return [
     {
       title: "Incubus Sky",
-      author: null,
       genre: "Fantasy",
       year: 2010,
       pages: 220,
     },
     {
       title: "The Twilight Wanderer",
-      author: null,
       genre: "Fantasy",
       year: 2012,
       pages: 300,
     },
     {
       title: "City of Monday",
-      author: null,
       genre: "Crime",
       year: 2020,
       pages: 250,
     },
     {
       title: "The Saturday's Shaman",
-      author: null,
       genre: "Romance",
       year: 2015,
       pages: 280,
     },
     {
       title: "The Underground of the Bane",
-      author: null,
       genre: "Thriller",
       year: 2020,
       pages: 20,
     },
     {
       title: "God in the Roadtrip",
-      author: null,
       genre: "Fantasy",
       year: 2018,
       pages: 320,
     },
     {
       title: "Sunken Haven",
-      author: null,
       genre: "Comedy",
       year: 2017,
       pages: 240,
     },
     {
       title: "The Harrowing Temper",
-      author: null,
       genre: "Crime",
       year: 2012,
       pages: 120,
     },
     {
       title: "Sleep of Hallows",
-      author: null,
       genre: "Fantasy",
       year: 2012,
       pages: 220,
     },
     {
       title: "The Cavern's Fire",
-      author: null,
       genre: "Crime",
       year: 2014,
       pages: 240,
```

### Storing the Google Service Account in Heroku

Before we push to Heroku we need to adjust the way we store the Google Service Account. First, we need to remove the quotes around the `FB_CERT_PRIVATE_KEY` variable in the `.env` file.

```diff
- FB_CERT_PRIVATE_KEY = "-----BEGIN PRIVATE KEY-----\n-\n"
+ FB_CERT_PRIVATE_KEY = -----BEGIN PRIVATE KEY-----\n-\n
```

And we need to add the following code to the config file for each type of deployment (test, production and development):

```diff
const CONFIG = {
  production: {
    ...
    firebase: {
      certConfig: {
        ...
-        private_key: process.env.FB_CERT_PRIVATE_KEY,
+        private_key: process.env.FB_CERT_PRIVATE_KEY.replace(/\\n/gm, "\n"),
        ...
      },
    },
  },
  development: {
    ...
    firebase: {
      certConfig: {
        ...
-        private_key: process.env.FB_CERT_PRIVATE_KEY,
+        private_key: process.env.FB_CERT_PRIVATE_KEY.replace(/\\n/gm, "\n"),
        ...
      },
    },
  },
  test: {
    ...
    firebase: {
      certConfig: {
        ...
-        private_key: process.env.FB_CERT_PRIVATE_KEY,
+        private_key: process.env.FB_CERT_PRIVATE_KEY.replace(/\\n/gm, "\n"),
        ...
      },
    },
  },
};
```

Then, we can create a commit and push to the `heroku` remote:

```bash
$ git commit...
```

This command will push from the current `04-heroku` branch to the `main` branch on Heroku because by default it tracks `main` for deploys.

```bash
$ git push heroku 04-heroku:main
```

Then, after the push we should see the following output in the terminal while it is building the app:

```bash
 git push heroku 04-heroku:main
Total 0 (delta 0), reused 0 (delta 0), pack-reused 0
remote: Compressing source files... done.
remote: Building source:
remote:
remote: -----> Building on the Heroku-20 stack
remote: -----> Node.js app detected
remote:
remote: -----> Creating runtime environment
remote:
remote:        NPM_CONFIG_LOGLEVEL=error
remote:        NODE_VERBOSE=false
remote:        NODE_ENV=production
remote:        NODE_MODULES_CACHE=true
remote:
remote: -----> Installing binaries
remote:        engines.node (package.json):  14.x
remote:        engines.npm (package.json):   unspecified (use default)
...
...
...
```

And finally, if everything went fine, we should see the remote url of the deployed server:

```bash
...
...
...
remote:        https://dani-assembler-demo-app.herokuapp.com/ deployed to Heroku
remote:
remote: Verifying deploy... done.
To https://git.heroku.com/dani-assembler-demo-app.git
   842d92f..dc46ab2  04-heroku -> main
```

If we connect to it and the `https://dani-assembler-demo-app.herokuapp.com/books` endpoint we should see the response:

<img src='src/img/heroku-response.png' width='600'>

Furthermore, we can use the following command to see the logs that the server outputs. This is especially useful to see it it crashed.

```bash
heroku logs --tail
```

```bash
2021-01-12T17:12:06.000000+00:00 app[api]: Build succeeded
2021-01-12T17:12:08.452244+00:00 app[web.1]:
2021-01-12T17:12:08.452259+00:00 app[web.1]: > nodejs-rest-api-design-intro-workshop@1.0.0 start /app
2021-01-12T17:12:08.452260+00:00 app[web.1]: > node src/index.js
2021-01-12T17:12:08.452260+00:00 app[web.1]:
2021-01-12T17:12:10.690433+00:00 app[web.1]: DB connected
2021-01-12T17:12:11.064056+00:00 app[web.1]: Server running at http://localhost:40454
2021-01-12T17:12:11.343617+00:00 heroku[web.1]: State changed from starting to up
2021-01-12T17:13:11.079563+00:00 app[web.1]: GET /books 200 108.140 ms - 648
2021-01-12T17:13:11.070230+00:00 heroku[router]: at=info method=GET path="/books" host=dani-assembler-demo-app.herokuapp.com request_id=a8b30ede-7e77-4746-9274-27ff03cdb313 fwd="2.152.148.5" dyno=web.1 connect=0ms service=127ms status=200 bytes=1480 protocol=https
```

## Resources

### Getting Started with Firebase

- [Add Firebase to your JavaScript project](https://firebase.google.com/docs/web/setup)
- [Add the Firebase Admin SDK to your server](https://firebase.google.com/docs/admin/setup)

## Author <!-- omit in toc -->

[Dani Lucaci](https://github.com/danilucaci)

## License <!-- omit in toc -->

[MIT](https://choosealicense.com/licenses/mit/)
