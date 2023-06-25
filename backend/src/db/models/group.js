"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Group extends Model {
    static associate(models) {
      const { Group, Ingredient, Dish } = models;
      Group.hasMany(Ingredient);
      Group.hasMany(Dish);
    }
    static async getGroups() {
      const query = `
        SELECT
          d."groupId",
          d.title,
          energy,
          protein,
          fat,
          carb,
          NULL AS count,
          NULL AS ingredientId,
          d.id AS dishId
        FROM dishes d
        LEFT JOIN (
          SELECT
            "dishId",
            ROUND(SUM(energy * count / 100), 2) AS energy,
            ROUND(SUM(protein * count / 100), 2) AS protein,
            ROUND(SUM(fat * count / 100), 2) AS fat,
            ROUND(SUM(carb * count / 100), 2) AS carb
          FROM (
            SELECT
              i."dishId",
              i.count,
              p.energy,
              p.protein,
              p.fat,
              p.carb
            FROM ingredients i
            LEFT JOIN products p ON p.id = i."productId"
            WHERE i."dishId" IS NOT NULL
          ) transformed
          GROUP BY "dishId"
        ) amount ON amount."dishId" = d.id

        UNION
          
        SELECT
          i."groupId",
          p.title,
          ROUND(p.energy * count / 100, 2) AS energy,
          ROUND(p.protein * count / 100, 2) AS protein,
          ROUND(p.fat * count / 100, 2) AS fat,
          ROUND(p.carb * count / 100, 2) AS carb,
          count,
          i.id AS ingredientId,
          NULL AS dishId
        FROM ingredients i
        LEFT JOIN products p ON p.id = i."productId"
        WHERE i."dishId" IS NULL
      `;
      const [groupItems] = await sequelize.query(query);

      const rawGroups = await Group.findAll({ raw: true });

      const groups = rawGroups.reduce((target, curr) => {
        target[curr.id] = {
          ...curr,
          groupItems: [],
          energy: 0,
          protein: 0,
          fat: 0,
          carb: 0,
        };
        return target;
      }, {});

      const amount = { energy: 0, protein: 0, fat: 0, carb: 0 };

      groupItems.forEach((groupItem) => {
        const group = groups[groupItem.groupId];

        // To float
        groupItem.energy = parseInt(groupItem.energy);
        groupItem.protein = parseFloat(groupItem.protein);
        groupItem.fat = parseFloat(groupItem.fat);
        groupItem.carb = parseFloat(groupItem.carb);
        group.groupItems.push(groupItem);

        // Amount for group
        group.energy = +(group.energy + groupItem.energy).toFixed(2);
        group.protein = +(group.protein + groupItem.protein).toFixed(2);
        group.fat = +(group.fat + groupItem.carb).toFixed(2);
        group.carb = +(group.carb + groupItem.carb).toFixed(2);

        // Amount for all
        amount.energy = +(amount.energy + groupItem.energy).toFixed(2);
        amount.protein = +(amount.protein + groupItem.protein).toFixed(2);
        amount.fat = +(amount.fat + groupItem.fat).toFixed(2);
        amount.carb = +(amount.carb + groupItem.carb).toFixed(2);
      });

      return { groups: Object.values(groups), amount };
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
