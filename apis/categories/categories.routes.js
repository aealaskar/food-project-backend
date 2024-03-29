const express = require("express");
const router = express.Router();
const upload = require("../../middleware/multer");
const passport = require("passport");

const {
  fetchCategory,
  createCategory,
  recipeCreate,
  categoryListFetch,
} = require("./cateogories.controllers");

router.param("categoryId", async (req, res, next, categoryId) => {
  const category = await fetchCategory(req, res, categoryId, next);
  if (category) {
    req.category = category;
    next();
  } else {
    next({ status: 404, message: "category not found!" });
  }
});

router.get("/", categoryListFetch);
router.get("/:categoryId", fetchCategory);
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  createCategory
);

router.post("/:categoryId/recipes", recipeCreate);
module.exports = router;
