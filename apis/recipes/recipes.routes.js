const express = require("express");
const upload = require("../../middleware/multer");
const passport = require("passport");
const router = express.Router();

const {
  fetchRecipe,
  fetchDetailRecipe,
  recipeListFetch,
  ingredientCreateRecipe,
  createRecipe,
} = require("./recipes.controllers");

router.param("recipeId", async (req, res, next, recipeId) => {
  const recipe = await fetchRecipe(recipeId, next);
  if (recipe) {
    req.recipe = recipe;
    next();
  } else {
    next({ status: 404, message: "recipe not found!" });
  }
});

router.get("/", recipeListFetch);

router.get("/:recipeId", fetchDetailRecipe);

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  createRecipe
); // i need to add users to recipe
// that user we will take its id and match it for ingredeints

// REVIEW: recipeID is misspelled
// REVIEW: Why do you need the recipe ID when creating an ingredient? Remember that an ingredient doesn't belong to one recipe. It can belong to many recipes.
router.post(
  "/:recipieId/ingredients",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  ingredientCreateRecipe
);

module.exports = router;
