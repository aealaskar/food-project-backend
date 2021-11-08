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
        const recipes = await Recipe.find().populate("categories").populate("owner")
        return res.json(recipes)
    } catch (error) {
        next(error)

    }
}

exports.fetchDetailRecipe = async (req, res, next) =>
res.status(200).json(req.recipe)



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




