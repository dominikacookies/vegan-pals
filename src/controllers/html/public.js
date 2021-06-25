const axios = require("axios");
const { Op } = require("sequelize");

const { Recipe, User, CookTogether } = require("../../models");

const COMPLEX_SEARCH_URL = `https://api.spoonacular.com/recipes/complexSearch`;
BASE_URL = `https://api.spoonacular.com/recipes/`;

const baseParams = {
  apiKey: "214dc041d6d44757b2a72a21f418f1e7",
  instructionsRequired: true,
  addRecipeInformation: true,
  fillIngredients: true,
  number: 10,
  diet: "vegan",
};

const renderHomePage = async (req, res) => {
  try {
    const { loggedIn } = req.session;

    if (loggedIn) {
      const upcomingCooktogether = await CookTogether.findOne({
        attributes: ["request_id"],
        where: {
          user_id: req.session.user.id,
          status: "accepted",
        },
        raw: true,
        nested: true,
      });

      if (upcomingCooktogether) {
        // TO DO: add image
        const upcomingCooktogetherDetails = await CookTogether.findAll({
          order: [["createdAt", "ASC"]],
          attributes: [
            "recipe_title",
            "contact_details",
            "datetime",
            "meal_type",
            "recipe_image",
            "recipe_id",
          ],
          where: {
            request_id: upcomingCooktogether.request_id,
            user_id: {
              [Op.ne]: req.session.user.id,
            },
          },
          include: [
            {
              model: User,
              attributes: ["first_name", "last_name"],
            },
          ],
          limit: 1,
          nested: true,
        });

        const mostUpcomingCooktogether = upcomingCooktogetherDetails[0].get({
          plain: true,
        });

        const latestSavedRecipes = await Recipe.findAll({
          where: {
            user_id: req.session.user.id,
          },
          order: [["createdAt", "DESC"]],
          limit: 6,
          raw: true,
          nested: true,
        });

        const name = req.session.user.firstName;

        return res.render("private-homepage", {
          mostUpcomingCooktogether,
          latestSavedRecipes,
          name,
        });
      }
    } else {
      const latestSavedRecipes = await Recipe.findAll({
        order: [["createdAt", "DESC"]],
        limit: 6,
        raw: true,
        nested: true,
      });

      res.render("public-homepage", { latestSavedRecipes });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: "Failed to render" });
  }
};

const renderLoginPage = (req, res) => {
  try {
    res.render("login", {
      // layout: "login",
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to render" });
  }
};

const renderSignupPage = (req, res) => {
  try {
    const intolerances = [
      "gluten",
      "grain",
      "soy",
      "peanut",
      "sesame",
      "sulphite",
      "tree nut",
      "wheat",
    ];
    res.render("signup", {
      intolerances,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: "Failed to render" });
  }
};

const renderSearchResults = async (req, res) => {
  const { loggedIn } = req.session;

  const getUserIntolerances = (intolerances) =>
    Object.entries(intolerances)
      .filter(([key, value]) => value === 1)
      .map(([key, value]) => key)
      .join(",");

  if (loggedIn) {
    const { intolerances } = req.session.user;

    const response = await axios.get(COMPLEX_SEARCH_URL, {
      params: {
        ...baseParams,
        ...req.query,
        intolerances: getUserIntolerances(intolerances),
      },
    });

    const recipeData = response.data.results.map((recipe) => {
      const recipeInfo = {
        dish_name: recipe.title,
        image: recipe.image,
        recipe_id: recipe.id,
      };

      return recipeInfo;
    });

    const requestUrl = response.request.res.responseUrl;

    res.render("search-results", { recipeData, loggedIn, requestUrl });
  } else {
    const response = await axios.get(COMPLEX_SEARCH_URL, {
      params: {
        ...baseParams,
        ...req.query,
      },
    });

    const recipeData = response.data.results.map((recipe) => {
      const recipeInfo = {
        dish_name: recipe.title,
        image: recipe.image,
        recipe_id: recipe.id,
      };

      return recipeInfo;
    });

    const requestUrl = response.request.res.responseUrl;

    res.render("search-results", { recipeData, loggedIn, requestUrl });
  }
};

const renderRecipePage = async (req, res) => {
  const { id } = req.params;
  const { loggedIn } = req.session;

  const response = await axios.get(
    `https://api.spoonacular.com/recipes/${id}/information?apiKey=214dc041d6d44757b2a72a21f418f1e7
    `
  );

  const ingredients = response.data.extendedIngredients.map((ingredient) => {
    return ingredient.original;
  });

  const recipeData = {
    id,
    loggedIn,
    title: response.data.title,
    image: response.data.image,
    servings: response.data.servings,
    prepTime: response.data.readyInMinutes,
    ingredients,
    directions: response.data.instructions,
    loggedIn,
  };

  res.render("recipe", recipeData);
};

module.exports = {
  renderHomePage,
  renderLoginPage,
  renderSignupPage,
  renderSearchResults,
  renderRecipePage,
};
