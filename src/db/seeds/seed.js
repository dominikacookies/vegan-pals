require("dotenv").config();

const sequelize = require("../../config/connection");
const { User, Recipe } = require("../../models");
const users = require("./data/users.json");
const recipes = require("./data/myRecipes.json");

const seed = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(users);
  console.log("Successfully seeded users");

  await Recipe.bulkCreate(recipes);
  console.log("Successfully seeded recipes");

  process.exit(0);
};

seed();
