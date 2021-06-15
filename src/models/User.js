const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection");

class User extends Model {}

const options = {
  sequelize,
  modelName: "user",
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
  first_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  bio: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  gluten_intolerance: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  peanuts_intolerance: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  sesame_intolerance: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  grain_intolerance: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  soy_intolerance: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  sulphite_intolerance: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  tree_nut_intolerance: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  wheat_intolerance: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  }
};

User.init(schema, options);

module.exports = User;
