"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      const { User, Product } = models;
      Category.belongsTo(User, {
        foreignKey: { allowNull: false },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      });
      Category.hasMany(Product);
    }
  }

  Category.init(
    {
      title: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "category",
    }
  );

  return Category;
};
