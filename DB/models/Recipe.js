const { schema, model, mongoose, Schema } = require("mongoose");
const mongooseSlugPlugin = require("mongoose-slug-plugin");

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

  // ingredients: [{ type: Schema.Types.ObjectId, ref: "Ingredient" }],
  // categories: [{
  //     type: Schema.Type._id,
  //     ref: "Category"
  // }],

  // ingredients: [(
  //     type: Schema.Types._id,
  //     ref: "Ingredients"
  // )]
  // owner: {
  //     type: Schema.Types.Objectid,
  //     ref : "User"
  // },
});

// REVIEW: You're using the plugin but dont have a slug field.
RecipeSchema.plugin(mongooseSlugPlugin, { tmpl: "<%=name%>" });

module.exports = model("Recipe", RecipeSchema);
