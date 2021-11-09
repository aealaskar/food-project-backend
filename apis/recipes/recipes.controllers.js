const Recipe = require("../../DB/models/Recipe");
const Ingredient = require("../../DB/models/Ingredient");

exports.fetchRecipe = async (recipeId, next) => {
  try {
    const recipe = await Recipe.findById(recipeId);
    return recipe;
  } catch (error) {
    next(error);
  }
};

exports.recipeListFetch = async (req, res, next) => {
  try {
    const recipes = await Recipe.find();
    // .populate("categories").populate("owner")
    return res.json(recipes);
  } catch (error) {
    next(error);
  }
};

exports.fetchDetailRecipe = async (req, res, next) =>
  res.status(200).json(req.recipe);

// create an ingredent controller/routes ---- many to many
exports.createRecipe = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }
    req.body.owner = req.user._id;
    const categoryId = req.params.categoryId;
    req.body = { ...req.body, category: categoryId };
    const newRecipe = await Recipe.create(req.body); // we would have to go to postman,body,raw ,json
    await newRecipe.populate({
      path: "owner",
      select: "username",
    });
    await Recipe.findOneAndUpdate(
      {
        _id: req.params.recipeId,
      },
      {
        $push: { ingredients: newIngredient._id },
      }
    );
    return res.status(201).json(newRecipe);
  } catch (error) {
    next(error);
  }
};

// exports.ingredientCreateRecipe = async (req, res, next) => {
//   // REVIEW: Why do you need to check the recipe owner when creating ingredients?
//   // if (!req.user._id.equals(req.recipe.owner._id))
//   //   return next({
//   //     status: 401,
//   //     message: "you are not the owner",
//   //   });
//   try {
//     if (req.file) {
//       req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
//     }
//     // console.log("req.body before", req.body);
//     // console.log("req.params before", req.params.recipeId);
//     // req.body = req.params.recipeId;
//     const recipeId = req.params.recipeId;
//     req.body = { ...req.body, recipes: recipeId };
//     console.log("this is after updating", req.body);

//     const newIngredient = await Ingredient.create(req.body);
//     await newRecipe.populate({
//       path: "recipes",
//       select: "name",
//     });

//     return res.status(201).json(newIngredient);
//   } catch (error) {
//     next(error);
//   }
// };

// exports.recipeCreate = async ( req, res, next) => {
// if (!req.user._id.equals(req.category.owner._id))

// return next({
//     status:401,
//     message: "you are not the owner",
// })}
// try {
//     if (req.file) {
//         req.body.image = `http://${req.get("host")}/media/${req.file.filename}`
//     }
//     req.body.recipe = req.params.categoryId;

//  const newRecipe = await Recipe.create(req.body)
//  await Category.findByIdAndUpdate(
//      {
//          _id:req.params.categoryId,
//      },
//      {
//          $push:{ recipes : newRecipe._id},
//      }
//  )
//  return res.status(201).json(newRecipe)
// } catch (error) {
//     next(error)
// }
