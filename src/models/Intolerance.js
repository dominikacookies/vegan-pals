const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection");

class Intolerance extends Model {}

const options = {
  sequelize,
  modelName: "intolerance",
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
  intolerance_name: {
    type: DataTypes.ENUM(
      "gluten",
      "egg",
      "dairy",
      "seafood",
      "peanuts",
      "shellfish",
      "sesame",
      "grain",
      "soy",
      "sulfite",
      "tree nuts",
      "wheat"
    ),
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
};

Intolerance.init(schema, options);

module.exports = Intolerance;
