"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Group extends Model {
    static associate(models) {
      const { Group, Ingredient } = models;
      Group.hasMany(Ingredient, { foreignKey: { allowNull: false } });
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
