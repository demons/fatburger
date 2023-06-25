"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      const { Group, DishTemplate } = models;
      User.hasMany(Group);
      User.hasMany(DishTemplate);
    }
  }

  User.init(
    {
      email: DataTypes.STRING(50),
      isActivated: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      password: {
        type: DataTypes.STRING(70),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "user",
    }
  );

  return User;
};
