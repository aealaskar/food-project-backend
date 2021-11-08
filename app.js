// basic instructions to start a BE project-------------------------------------------
// yarn init -y  ------- to create a package.json file
// yarn add global add nodemon  ------- to add nodemon and use scripts yarn start : nodemon to make the app more responsive
// yarn express ------- to create an express application that we save in app.
// yarn add cors ------- gives a browser access to the BE we need to use CORS
// yarn add mongoose ------- manages Data and provides schema validation
// yarn add multer ------- multer is a middleware that is responsible for uploading files
// yarn add bcrypt ------- to hash our passwords we will use bcrypt
// yarn add jsonwebtoken ------- to create a token
// yarn add passport passport-local ------- we will use a strategy or mechanism from passport called LocalStrategy for authenticating the user
// yarn add passport-jwt ------- A Passport strategy for authenticating with a JSON Web Token

// changed "main" to app.js in package.json and added script :nodemon

// -------------------------------------------------------------------------------------

const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const port = 8000;
app.listen(port, () => {
  console.log(`The application is runnong on localhost:${port}`);
});
