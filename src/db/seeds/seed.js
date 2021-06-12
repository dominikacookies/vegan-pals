require("dotenv").config();
const sequelize = require("../../config/connection");
const { User, Recipe, Intolerance } = require("../../models");
const users = require("./data/users.json");
const recipes = require("./data/myRecipes.json");
const intolerance = require("./data/intolerances.json");

const seed = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(users);
  console.log("Successfully seeded users");

  await Recipe.bulkCreate(recipes);
  console.log("Successfully seeded recipes");

  await Intolerance.bulkCreate(intolerance);
  console.log("Successfully seeded intolerances");

  process.exit(0);
};

seed();
