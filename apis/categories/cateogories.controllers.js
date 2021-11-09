const Category = require("../../DB/models/Category");
const Recipe = require("../../DB/models/Recipe");

exports.fetchCategory = async (categoryId, next) => {
  try {
    const category = await Category.findById(categoryId);
    return category;
  } catch (error) {
    next(error);
  }
};

exports.createCategory = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }
    req.body.owner = req.user._id;
    const newCategory = await Category.create(req.body);
    await newCategory.populate({ path: "owner", select: "username" });
    return res.status(201).json(newCategory);
  } catch (error) {
    next(error);
  }
};

exports.recipeCreate = async (req, res, next) => {
  // if (!req.user._id.equals(req.category.owner._id))

  // return next({
  //     status:401,
  //     message: "you are not the owner",
  // })}
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }

    const categoryId = req.params.categoryId;
    req.body = { ...req.body, category: categoryId };

    const newRecipe = await Recipe.create(req.body);
    await Category.findOneAndUpdate(
      {
        _id: req.params.categoryId,
      },
      {
        $push: { recipes: newRecipe._id },
      }
    );
    return res.status(201).json(newRecipe);
  } catch (error) {
    next(error);
  }
};
