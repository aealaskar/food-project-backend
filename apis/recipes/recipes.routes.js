const express = require("express");
const upload = require("../../middleware/multer");
const passport = require("passport");
const router = express.Router();

const {
  fetchRecipe,
  fetchDetailRecipe,
  recipeListFetch,
} = require("../recipes/recipes.controllers");

router.param("recipeId", async (req, res, next, recipeId) => {
  const recipe = await fetchRecipe(recipeId, next);
  if (recipe) {
    req.recipe = recipe;
    next();
  } else {
    next({ status: 404, message: "recipe not found!" });
  }
});

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  recipeListFetch
);

router.get("/:recipeId", fetchDetailRecipe);

// router.post()

module.exports = router;
