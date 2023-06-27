"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      const { User } = models;
      Product.belongsTo(User, {
        foreignKey: { allowNull: false },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      });
    }
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
      isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
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
