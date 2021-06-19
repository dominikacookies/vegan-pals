const { v4: uuidv4 } = require("uuid");
const { Op } = require("sequelize");

const { CookTogether, User, Recipe } = require("../src/models");

const {
  getAllCookTogethers,
  createCookTogether,
  updateCookTogether,
  deleteCookTogether,
  saveRecipe,
  deleteRecipe,
} = require("../src/controllers/api/index");

const renderReceived = async (req, res) => {
  console.log(User);
};

renderReceived();
