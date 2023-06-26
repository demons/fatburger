"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Dish extends Model {
    static associate(models) {
      const { Ingredient, Group } = models;
      Dish.belongsTo(Group, {
        foreignKey: { allowNull: false },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      });
      Dish.hasMany(Ingredient, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      });
    }
  }

  Dish.init(
    {
      title: {
        type: DataTypes.STRING(60),
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: "dish",
    }
  );

  return Dish;
};
