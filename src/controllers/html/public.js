const axios = require("axios");

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
      layout: "login",
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: "Failed to render" });
  }
};

const renderSignupPage = (req, res) => {
  try {
    res.render("signup", {
      layout: "signup",
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: "Failed to render" });
  }
};

const renderSearchResults = async (req, res) => {
  //get data from spoonacular api ready to render to search results page
  // /search-results?query=broccoli&maxReadyTime=30&intolerance=wheat
  // const { isLoggedIn } = req.session;
  const isLoggedIn = false;
  if (isLoggedIn) {
    //get intolerances from user
    //make request
  } else {
    //get intolerances from req.params
    // const intolerance = req.params;
    //make request
    const response = await axios.get(
      "https://api.spoonacular.com/recipes/complexSearch?&intolerances=soy&query=rice&apiKey=214dc041d6d44757b2a72a21f418f1e7&diet=vegan"
    );
    res.render("search-results", { data: JSON.stringify(response.data) });
  }
};

module.exports = {
  renderHomePage,
  renderLoginPage,
  renderSignupPage,
  renderSearchResults,
};
