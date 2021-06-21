const axios = require("axios");

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

const renderHomePage = (req, res) => {
  try {
    const { isLoggedIn } = req.session;
    res.render("homepage", { isLoggedIn });
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
  const { query } = req.query;

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
