const Category = require("../../DB/models/Category");

exports.fetchCategory = async (req, res, next) => {
  try {
    const category = await Category.find();
    return res.json(category);
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
