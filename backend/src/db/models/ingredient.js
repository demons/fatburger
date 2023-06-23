"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Ingredient extends Model {
    static associate(models) {
      const { Ingredient, Product, Group, Dish } = models;
      Ingredient.belongsTo(Product, { foreignKey: { allowNull: false } });
      Ingredient.belongsTo(Group);
      Ingredient.belongsTo(Dish);
    }
  }

  Ingredient.init(
    {
      count: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "ingredient",
    }
  );

  return Ingredient;
};
