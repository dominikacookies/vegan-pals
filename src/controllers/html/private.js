const renderCookTogether = (req, res) => {
  res.render("cooktogether");
};
const renderMyRecipesCookTogether = (req, res) => {
  res.render("myrecipes-cooktogether");
};
const renderMyRecipes = (req, res) => {
  res.render("myrecipes");
};

module.exports = {
  renderCookTogether,
  renderMyRecipesCookTogether,
  renderMyRecipes,
};
