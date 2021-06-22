const { Recipe, User, CookTogether } = require("../../models");
const { Op } = require("sequelize");

const renderCookTogether = async (req, res) => {
  const requestedCookTogethers = await CookTogether.findAll({
    where: {
      user_id: req.session.user.id,
      status: "received",
    },
    raw: true,
    nested: true,
  });

  const sentCookTogethers = await CookTogether.findAll({
    where: {
      user_id: req.session.user.id,
      status: "sent",
    },
    raw: true,
    nested: true,
  });

  const upcomingCookTogethers = await CookTogether.findAll({
    where: {
      user_id: req.session.user.id,
      status: "accepted",
    },
    raw: true,
    nested: true,
  });

  res.render("cooktogether", {
    requestedCookTogethers,
    sentCookTogethers,
    upcomingCookTogethers,
  });
};

const renderMyRecipesCookTogether = async (req, res) => {
  const recipes = await Recipe.findAll({
    attributes: ["recipe_id", "dish_name", "image"],
    where: {
      user_id: req.session.user.id,
    },
    raw: true,
    nested: true,
  });

  res.render("cooktogether-recipes", { recipes });
};

const renderCookTogetherPals = async (req, res) => {
  const { recipeId } = req.params;
  req.session.recipeId = recipeId;

  const { gluten, peanut, sesame, grain, soy, sulphite, wheat } =
    req.session.user.intolerances;

  const pals = await User.findAll({
    attributes: ["first_name", "last_name", "bio", "id"],
    where: {
      [Op.and]: [
        { gluten_intolerance: gluten },
        { grain_intolerance: grain },
        { soy_intolerance: soy },
        { peanut_intolerance: peanut },
        { sesame_intolerance: sesame },
        { sulphite_intolerance: sulphite },
        // { tree_nut_intolerance: treeNut },
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

  const hasPalSavedRecipe = async (pal) => {
    const recipe = await Recipe.findOne({
      where: {
        user_id: pal.id,
        recipe_id: recipeId,
      },
    });

    if (recipe) {
      pal.savedRecipe = true;
    }

    return pal;
  };

  const palsWithRecipeInfo = pals.map(hasPalSavedRecipe);

  res.render("cooktogether-pals", { pals, recipeId });
};

const renderMyRecipes = async (req, res) => {
  const { loggedIn } = req.session;

  const recipes = await Recipe.findAll({
    attributes: ["recipe_id", "dish_name", "image"],
    where: {
      user_id: req.session.user.id,
    },
    raw: true,
    nested: true,
  });

  res.render("myrecipes", { recipes, loggedIn });
};

const renderPrivateHomePage = (req, res) => {
  try {
    const { firstName } = req.session;
    res.render("privatehomepage", { firstName });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: "Failed to render" });
  }
};
module.exports = {
  renderCookTogether,
  renderMyRecipesCookTogether,
  renderMyRecipes,
  renderCookTogetherPals,
  renderPrivateHomePage,
};
