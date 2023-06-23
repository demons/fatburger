"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Dish extends Model {
    static associate(models) {
      const { Dish, Ingredient, Group } = models;
      Dish.belongsTo(Group, { foreignKey: { allowNull: false } });
      Dish.hasMany(Ingredient);
    }
  }

  Dish.init(
    {},
    {
      sequelize,
      modelName: "dish",
    }
  );

  return Dish;
};
