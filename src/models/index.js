const User = require("./User");
const Recipe = require("./Recipe");
const Intolerance = require("./Intolerance");

User.hasMany(Recipe, { foreignKey: "user_id" });
Recipe.belongsTo(User, { foreignKey: "user_id" });
Intolerance.belongsTo(User, { foreignKey: "user_id" });
User.hasMany(Intolerance, { foreignKey: "user_id" });

module.exports = { User, Recipe, Intolerance };
