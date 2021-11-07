const express = require("express");
const connectDB = require("./db/database");
const userRoutes = require("./apis/users/user.routes");
const passport = require("passport");
const { localStrategy, jwtStrategy } = require("./middleware/passport");

const app = express();

connectDB();

app.use(express.json());
app.use(passport.initialize());
passport.use(localStrategy);
passport.use(jwtStrategy);

//Routes
app.use("/api", userRoutes);

app.listen(8000, () => {
  console.log("The application is running on localhost:8000");
});
