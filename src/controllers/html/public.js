const axios = require("axios");

const COMPLEX_SEARCH_URL = `https://api.spoonacular.com/recipes/complexSearch`;

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

    res.render("search-results", { data: JSON.stringify(response.data) });
  } else {
    const response = await axios.get(COMPLEX_SEARCH_URL, {
      params: {
        ...baseParams,
        ...req.query,
      },
    });

    res.render("search-results", { data: JSON.stringify(response.data) });
  }
};

module.exports = {
  renderHomePage,
  renderLoginPage,
  renderSignupPage,
  renderSearchResults,
};
