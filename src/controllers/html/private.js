const { Recipe } = require("../../models");

const renderCookTogether = (req, res) => {
  res.render("cooktogether");
};
const renderMyRecipesCookTogether = (req, res) => {
  res.render("myrecipes-cooktogether");
};
const renderMyRecipes = async (req, res) => {
  const recipes = await Recipe.findAll({
    attributes: ['recipe_id', 'dish_name'],
    where: {
      user_id: req.session.user.id
    },
    raw: true,
    nested: true
  })

  console.log(recipes)
  res.render("myrecipes", {recipes})
};

module.exports = {
  renderCookTogether,
  renderMyRecipesCookTogether,
  renderMyRecipes,
};
