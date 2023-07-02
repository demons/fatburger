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
      comment: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "story",
    }
  );

  return Story;
};
