const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection");

class Recipe extends Model {}

const options = {
  sequelize,
  modelName: "recipe",
  timestamps: true,
  underscored: true,
  freezeTableName: true,
};

const schema = {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  recipe_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  dish_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "user",
      key: "id",
    },
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
};

Recipe.init(schema, options);

module.exports = Recipe;
