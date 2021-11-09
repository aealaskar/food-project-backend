const Ingredient = require("../../DB/models/Ingredient");
const Recipe = require("../../DB/models/Recipe");

exports.fetchIngredient = async (ingredientId, next) => {
  try {
    const ingredient = await Ingredient.findById(ingredientId);
    return ingredient;
  } catch (error) {
    next(error);
  }
};

exports.ingredientListFetch = async (req, res, next) => {
  try {
    const ingredients = await Ingredient.find();
    return res.json(ingredients);
  } catch (error) {
    next(error);
  }
};

exports.fetchDetailIngredient = async (req, res, next) =>
  res.status(200).json(req.ingredient);

exports.createIngredient = async (req, res, next) => {
  try {
    // const recipeId = req.param.recipeId;
    // req.body = { ...req.body, recipe: recipeId };
    const newIngredient = await Ingredient.create(req.body); // we would have to go to postman,body,raw ,json

    // await Recipe.findOneAndUpdate();

    return res.status(201).json(newIngredient);
  } catch (error) {
    next(error);
  }
};
