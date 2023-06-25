"use strict";

const { Model } = require("sequelize");

const getQuery = (userId) => {
  let condition = `"userId" = '${userId}'`;

  return `
    SELECT
      "groupId",
      title,
      energy,
      protein,
      fat,
      carb,
      NULL count,
      NULL ingredientId,
      d.id dishId
    FROM dishes d
    LEFT JOIN (
      SELECT
        "dishId",
        ROUND(SUM(energy *  count / 100), 2) energy,
        ROUND(SUM(protein *  count / 100), 2) protein,
        ROUND(SUM(fat *  count / 100), 2) fat,
        ROUND(SUM(carb *  count / 100), 2) carb
      FROM (
        SELECT "dishId", count, energy, protein, fat, carb
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
      ROUND(p.energy * count / 100, 2) energy,
      ROUND(p.protein * count / 100, 2) protein,
      ROUND(p.fat * count / 100, 2) fat,
      ROUND(p.carb * count / 100, 2) carb,
      count,
      i.id ingredientId,
      NULL dishId
    FROM ingredients i
    LEFT JOIN products p ON p.id = i."productId"
    WHERE "groupId" IN (
      SELECT id FROM groups WHERE ${condition}
    )
  `;
};

const computeGroups = (rawGroups, groupItems) => {
  let groups = {};
  const templateGroup = {
    groupItems: [],
    energy: 0,
    protein: 0,
    fat: 0,
    carb: 0,
  };

  if (Array.isArray(rawGroups)) {
    groups = rawGroups.reduce((target, curr) => {
      target[curr.id] = {
        ...curr,
        ...templateGroup,
      };
      return target;
    }, {});
  } else {
    groups[rawGroups.id] = {
      ...rawGroups,
      ...templateGroup,
    };
  }

  const amount = { energy: 0, protein: 0, fat: 0, carb: 0 };

  groupItems.forEach((groupItem) => {
    // To float
    groupItem.energy = parseInt(groupItem.energy);
    groupItem.protein = parseFloat(groupItem.protein);
    groupItem.fat = parseFloat(groupItem.fat);
    groupItem.carb = parseFloat(groupItem.carb);

    // Amount for group
    if (groups[groupItem.groupId]) {
      const group = groups[groupItem.groupId];
      group.energy = +(group.energy + groupItem.energy).toFixed(2);
      group.protein = +(group.protein + groupItem.protein).toFixed(2);
      group.fat = +(group.fat + groupItem.carb).toFixed(2);
      group.carb = +(group.carb + groupItem.carb).toFixed(2);
      group.groupItems.push(groupItem);
    }

    // Amount for all
    amount.energy = +(amount.energy + groupItem.energy).toFixed(2);
    amount.protein = +(amount.protein + groupItem.protein).toFixed(2);
    amount.fat = +(amount.fat + groupItem.fat).toFixed(2);
    amount.carb = +(amount.carb + groupItem.carb).toFixed(2);
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

      if (!rawGroup) {
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
