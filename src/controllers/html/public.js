const axios = require("axios");
const { Op } = require("sequelize");

const { Recipe, User, CookTogether } = require("../../models")

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
    const { loggedIn } = req.session;
    if (loggedIn) {

      const {request_id : upcomingCooktogetherId} = await CookTogether.findOne({
        attributes: ["request_id"],
        where: {
          user_id: req.session.user.id,
          status: "accepted"
        },
        order: [['datetime', 'DESC']],
        raw: true,
        nested: true
      })

      // TO DO: add image
      const upcomingCooktogetherDetails = await CookTogether.findOne({
        attributes: ["recipe_title", "contact_details", "datetime", "meal_type",],
        where: {
          request_id: upcomingCooktogetherId,
          user_id: {
            [Op.ne] : req.session.user.id
          }
        },
        include: [
          {
            model: User,
            attributes: ["first_name", "last_name"]
          },
        ],
        raw: true,
        nested: true
      })

      const latestSavedRecipes = await Recipe.findAll({
        where : {
          user_id: req.session.user.id
        },
        order: [[ 'createdAt', 'DESC']],
        limit: 6,
        raw: true,
        nested: true,
      })

      console.log(upcomingCooktogetherDetails)
      console.log(latestSavedRecipes)

      return res.render("homepage-loggedIn", {upcomingCooktogetherDetails, latestSavedRecipes})


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
