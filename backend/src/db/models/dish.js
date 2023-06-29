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

    static async getIngredients(userId, dishId) {
      const condition = `"userId"='${userId}' AND "dishId"='${dishId}'`;

      const query = `
        SELECT
          i."dishId",
          p.title,
          ROUND(p.energy * count / 100, 2) energy,
          ROUND(p.protein * count / 100, 2) protein,
          ROUND(p.fat * count / 100, 2) fat,
          ROUND(p.carb * count / 100, 2) carb,
          count,
          i.id "ingredientId",
          "createdAt"
        FROM ingredients i
        LEFT JOIN products p ON p.id = i."productId"
        WHERE "dishId" IN (
          SELECT id FROM "dishes" WHERE ${condition}
        )

        ORDER BY "createdAt";`;

      const [ingredients] = await sequelize.query(query);

      return ingredients;
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
