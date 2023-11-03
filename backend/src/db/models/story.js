"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Story extends Model {
    static associate(models) {
      const { User, Story } = models;
      Story.belongsTo(User, {
        foreignKey: { allowNull: false },
        onDelete: "RESTRICT",
        onUpdate: "CASCADE",
      });
    }
  }

  Story.init(
    {
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
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
      fib: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false,
        defaultValue: 0,
      },
      comment: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: "",
      },
      type: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      weight: {
        type: DataTypes.DECIMAL(3, 1),
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "story",
    }
  );

  return Story;
};
