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
          ROUND(p.energy * count * weight / 100, 2) energy,
          ROUND(p.protein * count * weight / 100, 2) protein,
          ROUND(p.fat * count * weight / 100, 2) fat,
          ROUND(p.carb * count * weight / 100, 2) carb,
          ROUND(p.fib * count * weight / 100, 2) fib,
          weight,
          count,
          i.id "ingredientId",
          "createdAt"
        FROM ingredients i
        LEFT JOIN products p ON p.id = i."productId"
        WHERE "dishId" IN (
          SELECT id FROM "dishes" WHERE ${condition}
        )

        ORDER BY i.id;`;

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
      weight: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      count: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: "dish",
    }
  );

  return Dish;
};
