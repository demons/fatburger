"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Token extends Model {
    static associate(models) {
      const { User, Token } = models;
      Token.belongsTo(User, {
        foreignKey: { allowNull: false },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }

  Token.init(
    {
      refreshToken: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "token",
    }
  );

  return Token;
};
