const axios = require("axios");

const COMPLEX_SEARCH_URL = `https://api.spoonacular.com/recipes/complexSearch`;
BASE_URL = `https://api.spoonacular.com/recipes/`;

const baseParams = {
  apiKey: "a400351722ac47169e8e48e6415e0440",
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
  console.log(id);

  const response = await axios.get(
    `https://api.spoonacular.com/recipes/${id}/information?apiKey=214dc041d6d44757b2a72a21f418f1e7`
  );

  console.log(response.data);

  //call to spoonacular
  const { loggedIn } = req.session;

  if (!loggedIn) {
    res.render("login");
  } else {
    try {
      res.render("recipe");
    } catch (err) {
      console.log(err.message);
      res.status(500).json({ error: "Failed to render" });
    }
  }
};

module.exports = {
  renderHomePage,
  renderLoginPage,
  renderSignupPage,
  renderSearchResults,
  renderRecipePage,
};
