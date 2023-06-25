"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class DishTemplate extends Model {
    static associate(models) {
      const { Ingredient, User } = models;
      DishTemplate.hasMany(Ingredient, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      });
      DishTemplate.belongsTo(User, {
        foreignKey: { allowNull: false },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      });
    }
  }

  DishTemplate.init(
    {
      title: {
        type: DataTypes.STRING(60),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "dishTemplate",
    }
  );

  return DishTemplate;
};
