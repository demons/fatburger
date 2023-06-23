"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Group extends Model {
    static associate(models) {
      const { Group, Ingredient, Dish } = models;
      Group.hasMany(Ingredient);
      Group.hasMany(Dish);
    }
  }

  Group.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "group",
    }
  );

  return Group;
};
