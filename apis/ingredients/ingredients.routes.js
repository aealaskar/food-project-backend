const express = require("express");
const upload = require("../../middleware/multer");
const passport = require("passport");
const router = express.Router();

const {

    ingredientListFetch,
    fetchDetailIngredient,
    createIngredient,
    
} = require("./ingredients.controllers");




router.param("ingredient", async (req, res, next, ingredientId) =>{
const ingredient = await fetchIngredient(ingredientId, next);
if (ingredient) {
    req.ingredient = ingredient
    next()
} else {
    next({ status: 404, message: "ingredient not found!"})
}
})

router.get("/", ingredientListFetch)

router.get("/:ingredientId", fetchDetailIngredient)

router.post("/", createIngredient)

module.exports = router
