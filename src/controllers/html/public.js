const axios = require("axios");

const { Recipe } = require("../../models")

const COMPLEX_SEARCH_URL = `https://api.spoonacular.com/recipes/complexSearch`;

const baseParams = {
  apiKey: "a400351722ac47169e8e48e6415e0440",
  instructionsRequired: true,
  addRecipeInformation: true,
  fillIngredients: true,
  number: 10,
  diet: "vegan",
};

const renderHomePage = async (req, res) => {
  try {
    const { isLoggedIn } = req.session;
    if (isLoggedIn) {
      return res.render("homepage-loggedIn")

      
    } else {
      const latestSavedRecipes = await Recipe.findAll({
          order: [[ 'createdAt', 'DESC']],
          limit: 6,
          raw: true,
          nested: true,
        })

      console.log(latestSavedRecipes)
      res.render("homepage-loggedout", {latestSavedRecipes})
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
    console.log(err.message);
    res.status(500).json({ error: "Failed to render" });
  }
};

const renderSignupPage = (req, res) => {
  try {
    res.render("signup", {
      // layout: "signup",
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

    res.render("search-results", { recipeData });
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

    console.log(recipeData)

    res.render("search-results", { recipeData });
  }
};

module.exports = {
  renderHomePage,
  renderLoginPage,
  renderSignupPage,
  renderSearchResults,
};
