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







