const axios = require("axios");

const { CookTogether, User, Recipe } = require("../src/models");

//how do I get ids from session??
const userId = 2;
const recipeId = 798400;

// Requests fns
const getAllReceived = async (req, res) => {
  try {
    const allReceived = await CookTogether.findAll({
      where: {
        user_id: userId,
        status: "received",
      },
      raw: true,
      nested: true,
    });
    console.log(allReceived);
  } catch (error) {
    console.log(error);
  }
};

const getAllUpcoming = async (req, res) => {
  try {
    const allUpcoming = await CookTogether.findAll({
      where: {
        //user_id: userId,
        status: "accepted",
      },
      raw: true,
      nested: true,
    });
    console.log(allUpcoming);
  } catch (error) {
    console.log(error);
  }
};

//how to filter by datetime??
const getNearestUpcoming = async (req, res) => {
  try {
    const nearestUpcoming = await CookTogether.findOne({
      where: {
        user_id: userId,
        status: "accepted",
      },
      raw: true,
      nested: true,
    });
    console.log(nearestUpcoming);
  } catch (error) {
    console.log(error);
  }
};

const getAllSent = async (req, res) => {
  try {
    const allSent = await CookTogether.findOne({
      where: {
        user_id: userId,
        status: "sent",
      },
      raw: true,
      nested: true,
    });
    console.log(allSent);
  } catch (error) {
    console.log(error);
  }
};

// User info
const getUserInfo = async (req, res) => {
  try {
    const userInfo = await User.findAll({
      where: {
        id: userId,
      },
      raw: true,
      nested: true,
    });
    console.log(userInfo);
  } catch (error) {
    console.log(error);
  }
};

const getRecipe = async (req, res) => {
  const { isLoggedIn } = req.session;
  if (isLoggedIn) {
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=a694fd998d4342db94e07530f4373371`
    );
    res.render("recipe-save", { data: JSON.stringify(response.data) });
  } else {
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=a694fd998d4342db94e07530f4373371`
    );
    res.render("recipe", { data: JSON.stringify(response.data) });
  }
};

//getAllReceived();
//getUserInfo();
getRecipe();
//getAllUpcoming();
//getNearestUpcoming();
//getAllSent();

module.exports = {
  getAllReceived,
  getUserInfo,
  getRecipe,
  getAllUpcoming,
  getNearestUpcoming,
  getAllSent,
};
