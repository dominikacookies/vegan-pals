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
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  datetime: {
    type: DataTypes.DATE,
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
};

CookTogether.init(schema, options);

module.exports = CookTogether;
