const User = require("./User");
const Recipe = require("./Recipe");
const CookTogether = require("./CookTogether");

User.hasMany(Recipe, { foreignKey: "user_id" });
Recipe.belongsTo(User, { foreignKey: "user_id" });
CookTogether.belongsTo(User, { foreignKey: "user_id" });
User.hasMany(CookTogether, { foreignKey: "user_id" });

module.exports = { User, Recipe, CookTogether };
