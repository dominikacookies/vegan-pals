const { Recipe, User } = require("../../models");
const { Op } = require("sequelize");

const renderCookTogether = (req, res) => {
  res.render("cooktogether");
};

const renderMyRecipesCookTogether = (req, res) => {
  res.render("myrecipes-cooktogether");
};

const renderCookTogetherPals = async (req, res) => {
  const { recipeId } = req.params;
  req.session.recipeId = recipeId;

  const { gluten, peanut, sesame, grain, soy, sulphite, treeNut, wheat } =
    req.session.user.intolerances;

  const pals = await User.findAll({
    attributes: ["first_name", "last_name", "bio"],
    where: {
      [Op.and]: [
        { gluten_intolerance: gluten },
        { grain_intolerance: grain },
        { soy_intolerance: soy },
        { peanut_intolerance: peanut },
        { sesame_intolerance: sesame },
        { sulphite_intolerance: sulphite },
        { tree_nut_intolerance: treeNut },
        { wheat_intolerance: wheat },
      ],
      id: {
        [Op.ne]: req.session.user.id,
      },
    },
    raw: true,
    nested: true,
  });

  console.log(pals);

  res.render("cooktogether-pals", { pals });
};

const renderMyRecipes = async (req, res) => {
  const recipes = await Recipe.findAll({
    attributes: ["recipe_id", "dish_name"],
    where: {
      user_id: req.session.user.id,
    },
    raw: true,
    nested: true,
  });

  res.render("myrecipes", { recipes });
};

module.exports = {
  renderCookTogether,
  renderMyRecipesCookTogether,
  renderMyRecipes,
  renderCookTogetherPals,
};
