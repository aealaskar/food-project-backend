const express = require("express");

const connectDB = require("./DB/databases");

const userRoutes = require("./apis/users/user.routes");
const categoryRoutes = require("./apis/categories/categories.routes");
const ingredientRoutes = require("./apis/ingredients/ingredients.routes");
const errorHandler = require("./middleware/errorHandler");
const passport = require("passport");
const recipeRoutes = require("./apis/recipes/recipes.routes");
const { localStrategy, jwtStrategy } = require("./middleware/passport");
const cors = require("cors");

const app = express();

connectDB();

// Middleware

app.use(express.json());
app.use(passport.initialize());
passport.use(localStrategy);
passport.use(jwtStrategy);
app.use(cors());
//Routes

app.use("/api", userRoutes);
// REVIEW: Path should be /api/categories
app.use("/api/category", categoryRoutes);
app.use("/api/recipes", recipeRoutes);
app.use("/api/ingredients", ingredientRoutes);
// REVIEW: Uploading images will not work since you didnt create your media route here

app.use(errorHandler);

app.listen(8000, () => {
  console.log("The application is running on localhost:8000");
});

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
