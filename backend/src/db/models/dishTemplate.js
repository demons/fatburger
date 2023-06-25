"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class DishTemplate extends Model {
    static associate(models) {
      const { DishTemplate, Ingredient, User } = models;
      DishTemplate.hasMany(Ingredient);
      DishTemplate.belongsTo(User, { foreignKey: { allowNull: false } });
    }
  }

  DishTemplate.init(
    {
      title: {
        type: DataTypes.STRING(50),
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
