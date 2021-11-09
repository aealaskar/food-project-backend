const { schema, model, mongoose, Schema } = require("mongoose");

const RecipeSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },

  ingredients: [{ type: Schema.Types.ObjectId, ref: "Ingredient" }],
  categories: [
    {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
  ],
});

module.exports = model("Recipe", RecipeSchema);
