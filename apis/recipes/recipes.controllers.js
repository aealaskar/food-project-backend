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
// })
// }



