const User = require("../../db/models/User");
const { JWT_SECRET } = require("../../config/keys");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const tokenGenerator = (user) => {
  const payload = {
    _id: user._id,
    username: user.username,
  };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
  return token;
};

exports.signup = async (req, res, next) => {
  try {
    const saltRounds = 10;
    const hashedPass = await bcrypt.hash(req.body.password, saltRounds);
    req.body.password = hashedPass;

    const newUser = await User.create(req.body);
    const token = tokenGenerator(newUser);
    res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
};

exports.signin = async (req, res) => {
  const token = tokenGenerator(req.user);
  res.json({ token });
};
