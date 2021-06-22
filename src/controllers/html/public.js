const axios = require("axios");
const { Op } = require("sequelize");

const { Recipe, User, CookTogether } = require("../../models");

const COMPLEX_SEARCH_URL = `https://api.spoonacular.com/recipes/complexSearch`;
BASE_URL = `https://api.spoonacular.com/recipes/`;

const baseParams = {
  apiKey: "a694fd998d4342db94e07530f4373371",
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
      const { request_id: upcomingCooktogetherId } = await CookTogether.findOne(
        {
          attributes: ["request_id"],
          where: {
            user_id: req.session.user.id,
            status: "accepted",
          },
          order: [["datetime", "DESC"]],
          raw: true,
          nested: true,
        }
      );

      // TO DO: add image
      const upcomingCooktogetherDetails = await CookTogether.findOne({
        attributes: [
          "recipe_title",
          "contact_details",
          "datetime",
          "meal_type",
          "recipe_image",
          "recipe_id",
        ],
        where: {
          request_id: upcomingCooktogetherId,
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
        raw: true,
        nested: true,
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
        upcomingCooktogetherDetails,
        latestSavedRecipes,
        name,
      });
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
      "gray",
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

const getUserIntolerances = (intolerances) =>
  Object.entries(intolerances)
    .filter(([key, value]) => value === 1)
    .map(([key, value]) => key)
    .join(",");

const renderSearchResults = async (req, res) => {
  const { loggedIn } = req.session;

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
        title: recipe.title,
        image: recipe.image,
        recipe_id: recipe.id,
      };

      return recipeInfo;
    });

    res.render("search-results", { recipeData, loggedIn });
  } else {
    const response = await axios.get(COMPLEX_SEARCH_URL, {
      params: {
        ...baseParams,
        ...req.query,
      },
    });

    const recipeData = response.data.results.map((recipe) => {
      const recipeInfo = {
        title: recipe.title,
        image: recipe.image,
        recipe_id: recipe.id,
      };

      return recipeInfo;
    });

    res.render("search-results", { recipeData });
  }
};

const renderRecipePage = async (req, res) => {
  const { id } = req.params;

  const response = await axios.get(
    `https://api.spoonacular.com/recipes/${id}/information?apiKey=a694fd998d4342db94e07530f4373371`
  );

  const ingredients = response.data.extendedIngredients.map((ingredient) => {
    return ingredient.original;
  });

  const recipeData = {
    title: response.data.title,
    image: response.data.image,
    servings: response.data.servings,
    prepTime: response.data.readyInMinutes,
    ingredients,
    directions: response.data.instructions,
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
