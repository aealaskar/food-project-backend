// basic instructions to start a BE project-------------------------------------------
// yarn init -y  ------ to create a package.json file
// yarn add global add nodemon  -------- to add nodemon and use scripts yarn start : nodemon to make the app more responsive
// yarn express to make
// yarn add cors
// yarn add mongoose
// yarn add multer
// yarn add jsonwebtoken
// yarn add bcrypt
// yarn add passport passport-local
// yarn add passport-jwt

// changed "main" to app.js in package.json and added script :nodemon

// -------------------------------------------------------------------------------------

const express = require("express");

const app = express();

app.use(express.json());
