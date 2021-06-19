const axios = require("axios");

const BASE_URL = `https://api.spoonacular.com/recipes/complexSearch?apiKey=a400351722ac47169e8e48e6415e0440&instructionsRequired=true&addRecipeInformation=true&fillIngredients=true&number=10&diet=vegan`;

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
  console.log(query);
  if (loggedIn) {
    let intoleranceParams = "";
    const generateIntoleranceParams = (intoleranceKeyValuePairArray) => {
      if (!intoleranceKeyValuePairArray[1]) {
        return;
      }
      if (intoleranceParams === "") {
        intoleranceParams =
          intoleranceKeyValuePairArray[0] == "treeNut"
            ? "&intolerances=tree%20nut"
            : `&intolerances=${intoleranceKeyValuePairArray[0]}`;
      } else {
        intoleranceKeyValuePairArray[0] == "treeNut"
          ? (intoleranceParams += ",tree%20nut")
          : (intoleranceParams += `,${intoleranceKeyValuePairArray[0]}`);
      }
    };
    const { intolerances } = req.session.user;
    console.log(intolerances);

    Object.entries(intolerances).map(generateIntoleranceParams);
    // console.log(intoleranceParams);
    //
    const response = await axios.get(
      "https://api.spoonacular.com/recipes/complexSearch",
      {
        params: {
          apiKey: "a400351722ac47169e8e48e6415e0440",
          instructionsRequired: true,
          addRecipeInformation: true,
          fillIngredients: true,
          number: 10,
          diet: "vegan",
          intolerances: getUserIntolerances(intolerances),
        },
      }
    );
    // console.log(response.data);
    res.render("search-results", { data: JSON.stringify(response.data) });
  } else {
    // const response = await axios.get(`${BASE_URL}${query}`);
    // res.render("search-results", {
    //   data: JSON.stringify(response.data),
    // });
    //map through each result
  }
};

module.exports = {
  renderHomePage,
  renderLoginPage,
  renderSignupPage,
  renderSearchResults,
};
