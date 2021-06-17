const renderHomePage = (req, res) => {
  res.render("homepage");
};

const renderLoginPage = (req, res) => {
  res.render("login");
};

const renderSignupPage = (req, res) => {
  res.render("signup");
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
