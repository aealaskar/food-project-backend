const express = require("express");
const router = express.Router();
const upload = require("../../middleware/multer");
const passport = require("passport");

const { fetchCategory, createCategory } = require("./cateogories.controllers");

router.get("/", fetchCategory);
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  createCategory
);

module.exports = router;
