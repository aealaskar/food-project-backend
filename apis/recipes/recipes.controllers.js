const Recipe = require ("../../DB/models/Recipe")



exports.fetchRecipe = async (recipeId, next) =>{
try{
const recipe = await Recipe.findById(recipeId)
return recipe
} catch (error) {
next(error)
}
}

exports.recipeListFetch = async ( req, res,next) => {
    try{
        const recipes = await Recipe.find()
        // .populate("categories").populate("owner")
        return res.json(recipes)
    } catch (error) {
        next(error)

    }
}

exports.fetchDetailRecipe = async (req, res, next) =>
res.status(200).json(req.recipe)

// create an ingredent controller/routes ---- many to many 
exports.createRecipe = async (req, res, next) => {
    try {
        if (req.file) {
            req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
          }
          req.body.owner = req.user._id;

      const newRecipe = await Recipe.create(req.body); // we would have to go to postman,body,raw ,json
      await newRecipe.populate({
        path: "owner",
        select: "username",
      });
      return res.status(201).json(newRecipe);
    } catch (error) {
      next(error);
    }
  };

 

exports.ingredientCreateRecipe = async ( req, res, next) => {
if (!req.user._id.equals(req.recipe.owner._id))

return next({
    status:401,
    message: "you are not the owner",
})
try {
    if (req.file) {
        req.body.image = `http://${req.get("host")}/media/${req.file.filename}`
    }
    req.body.ingredient = req.params.recipeId;

 const newIngredient = await Ingredient.create(req.body)
 await Recipe.findByIdAndUpdate(
     {
         _id:req.params.recipeId,
     },
     {
         $push:{ ingredients : newIngredient._id},
     }
 )
 return res.status(201).json(newIngredient)
} catch (error) {
    next(error)
}
}






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




