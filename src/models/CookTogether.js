const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection");

class CookTogether extends Model {}

const options = {
  sequelize,
  modelName: "cooktogether",
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
  request_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  datetime: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  meal_type: {
    type: DataTypes.ENUM("breakfast", "lunch", "dinner"),
    allowNull: false,
  },
  message: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  contact_details: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM("sent", "received", "accepted"),
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
  recipe_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  recipe_title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  recipe_image: {
    type: DataTypes.STRING,
    allowNull: false,
  }
};

CookTogether.init(schema, options);

module.exports = CookTogether;
