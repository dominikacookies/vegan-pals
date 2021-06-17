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

const renderSearchResults = (req, res) => {
  //get data from spoonacular api ready to render to search results page
  res.send("Get search results");
  res.render("search-results");
};

module.exports = {
  renderHomePage,
  renderLoginPage,
  renderSignupPage,
  renderSearchResults,
};
