const mongoose = require("mongoose");
const mongooseSlugPlugin = require("mongoose-slug-plugin");

const CategorySchma = mongoose.Schema({
  name: { type: String, required: true },
  image: String,
  // REVIEW: Since it's a list of recipes, name should be `recipes` not recipe
  recipe: [{ type: mongoose.Schema.Types.ObjectId, ref: "Recipe" }],
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

CategorySchma.plugin(mongooseSlugPlugin, { tmpl: "<%=name%>" });

module.exports = mongoose.model("Category", CategorySchma);
