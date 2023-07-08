"use strict";

const { Model } = require("sequelize");

const getQuery = (userId) => {
  let condition = `"userId" = '${userId}'`;

  return `
    SELECT
      "groupId",
      title,
      ROUND(CASE
        WHEN d.weight > 0
        THEN energy * 100 / d.weight * d.count / 100
        ELSE energy
      END, 2) energy,
      ROUND(CASE
        WHEN d.weight > 0
        THEN protein * 100 / d.weight * d.count / 100
        ELSE protein
      END, 2) protein,
      ROUND(CASE
        WHEN d.weight > 0
        THEN fat * 100 / d.weight * d.count / 100
        ELSE fat
      END, 2) fat,
      ROUND(CASE
        WHEN d.weight > 0
        THEN carb * 100 / d.weight * d.count / 100
        ELSE carb
      END, 2) carb,
      ROUND(CASE
        WHEN d.weight > 0
        THEN fib * 100 / d.weight * d.count / 100
        ELSE fib
      END, 2) fib,
      NULL weight,
      d.weight "dishWeight",
      d.count "dishCount",
      NULL count,
      NULL "ingredientId",
      d.id "dishId",
      "createdAt"
    FROM dishes d
    LEFT JOIN (
      SELECT
        "dishId",
        SUM(energy *  count * weight / 100) energy,
        SUM(protein *  count * weight / 100) protein,
        SUM(fat *  count * weight / 100) fat,
        SUM(carb *  count * weight / 100) carb,
        SUM(fib *  count * weight / 100) fib
      FROM (
        SELECT "dishId", count, energy, protein, fat, carb, fib, weight
        FROM ingredients i
        LEFT JOIN products p ON p.id = i."productId"
        WHERE "dishId" IN (
          SELECT id FROM dishes
          WHERE "groupId" IN (
            SELECT id FROM groups WHERE ${condition}
          )
        )
      ) ingredients
      GROUP BY "dishId"
    ) amount ON amount."dishId" = d.id
    WHERE d."groupId" IN (
      SELECT id FROM groups WHERE ${condition}
    )
    
    UNION
    
    SELECT
      i."groupId",
      p.title,
      ROUND(p.energy * count * weight / 100, 2) energy,
      ROUND(p.protein * count * weight / 100, 2) protein,
      ROUND(p.fat * count * weight / 100, 2) fat,
      ROUND(p.carb * count * weight / 100, 2) carb,
      ROUND(p.fib * count * weight / 100, 2) fib,
      weight,
      NULL,
      NULL,
      count,
      i.id "ingredientId",
      NULL "dishId",
      "createdAt"
    FROM ingredients i
    LEFT JOIN products p ON p.id = i."productId"
    WHERE "groupId" IN (
      SELECT id FROM groups WHERE ${condition}
    )

    ORDER BY "createdAt";
  `;
};

const computeGroups = (rawGroups, groupItems) => {
  let groups = {};

  if (Array.isArray(rawGroups)) {
    groups = rawGroups.reduce((target, curr) => {
      target[curr.id] = {
        ...curr,
        groupItems: [],
        energy: 0,
        protein: 0,
        fat: 0,
        carb: 0,
        fib: 0,
      };
      return target;
    }, {});
  } else {
    groups[rawGroups.id] = {
      ...rawGroups,
      groupItems: [],
      energy: 0,
      protein: 0,
      fat: 0,
      carb: 0,
      fib: 0,
    };
  }

  const amount = { energy: 0, protein: 0, fat: 0, carb: 0, fib: 0 };

  groupItems.forEach((groupItem) => {
    // To float
    groupItem.energy = parseInt(groupItem.energy | 0);
    groupItem.protein = parseFloat(groupItem.protein | 0);
    groupItem.fat = parseFloat(groupItem.fat | 0);
    groupItem.carb = parseFloat(groupItem.carb | 0);
    groupItem.fib = parseFloat(groupItem.fib | 0);

    // Amount for group
    if (groups[groupItem.groupId]) {
      const group = groups[groupItem.groupId];
      group.energy = +(group.energy + groupItem.energy).toFixed(2);
      group.protein = +(group.protein + groupItem.protein).toFixed(2);
      group.fat = +(group.fat + groupItem.fat).toFixed(2);
      group.carb = +(group.carb + groupItem.carb).toFixed(2);
      group.fib = +(group.fib + groupItem.fib).toFixed(2);
      group.groupItems.push(groupItem);
    }

    // Amount for all
    amount.energy = +(amount.energy + groupItem.energy).toFixed(2);
    amount.protein = +(amount.protein + groupItem.protein).toFixed(2);
    amount.fat = +(amount.fat + groupItem.fat).toFixed(2);
    amount.carb = +(amount.carb + groupItem.carb).toFixed(2);
    amount.fib = +(amount.fib + groupItem.fib).toFixed(2);
  });

  return { result: groups, amount };
};

module.exports = (sequelize, DataTypes) => {
  class Group extends Model {
    static associate(models) {
      const { User, Ingredient, Dish } = models;
      Group.belongsTo(User, {
        foreignKey: { allowNull: false },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      });
      Group.hasMany(Ingredient, { onUpdate: "CASCADE", onDelete: "CASCADE" });
      Group.hasMany(Dish);
    }

    static async getGroups(userId) {
      // Get GroupItems
      const query = getQuery(userId);
      const [groupItems] = await sequelize.query(query);

      // Get Groups
      const rawGroups = await Group.findAll({
        where: {
          userId,
        },
        raw: true,
      });

      if (!rawGroups) {
        return null;
      }

      const { result, amount } = computeGroups(rawGroups, groupItems);

      return { groups: Object.values(result), amount };
    }

    static async getGroup(userId, groupId) {
      // Get GroupItems
      const query = getQuery(userId);
      const [groupItems] = await sequelize.query(query);

      // Get Group
      const rawGroup = await Group.findByPk(groupId, {
        where: {
          userId,
        },
        raw: true,
      });

      if (!rawGroup) {
        return null;
      }

      const { result, amount } = computeGroups(rawGroup, groupItems);

      return { group: Object.values(result)[0], amount };
    }
  }

  Group.init(
    {
      title: {
        type: DataTypes.STRING(50),
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
