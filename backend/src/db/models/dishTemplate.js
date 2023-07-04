"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class DishTemplate extends Model {
    static associate(models) {
      const { Ingredient, User } = models;
      DishTemplate.hasMany(Ingredient, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      });
      DishTemplate.belongsTo(User, {
        foreignKey: { allowNull: false },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      });
    }

    static async getIngredients(userId, dishTemplateId) {
      const condition = `"userId"='${userId}' AND "dishTemplateId"='${dishTemplateId}'`;

      const query = `
        SELECT
          i."dishTemplateId",
          p.title,
          ROUND(p.energy * count * weight / 100, 2) energy,
          ROUND(p.protein * count * weight / 100, 2) protein,
          ROUND(p.fat * count * weight / 100, 2) fat,
          ROUND(p.carb * count * weight / 100, 2) carb,
          weight
          count,
          i.id "ingredientId",
          "createdAt"
        FROM ingredients i
        LEFT JOIN products p ON p.id = i."productId"
        WHERE "dishTemplateId" IN (
          SELECT id FROM "dishTemplates" WHERE ${condition}
        )

        ORDER BY "createdAt";`;

      const [ingredients] = await sequelize.query(query);

      return ingredients;
    }
  }

  DishTemplate.init(
    {
      title: {
        type: DataTypes.STRING(60),
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
