"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {}
  }

  Product.init(
    {
      title: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      maker: {
        type: DataTypes.STRING(50),
        allowNull: false,
        defaultValue: "",
      },
      energy: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      protein: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false,
      },
      fat: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false,
      },
      carb: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "product",
    }
  );

  return Product;
};
