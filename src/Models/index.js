const User = require("./User");
const Recipe = require("./Recipe");
const Intolerance = require("./Intolerance");

User.hasMany(Recipe, { foreignKey: "user_id" });
Recipe.belongsToMany(User, { foreignKey: "user_id" });
Intolerance.belongsToMany(User, { foreignKey: "user_id" });

module.exports = { User, Recipe, Intolerance };
