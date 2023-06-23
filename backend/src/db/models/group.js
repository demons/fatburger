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
        select d."groupId", d.title, energy, protein, fat, carb, null as ingredientId, d.id as dishId
        from dishes d
        join (
          select "dishId", ROUND(sum(energy * count / 100), 2) as energy, ROUND(sum(protein * count / 100), 2) as protein, ROUND(sum(fat * count / 100), 2) as fat, ROUND(sum(carb * count / 100), 2) as carb from (
            select i."dishId", i.count, p.energy, p.protein, p.fat, p.carb from ingredients i
              join products p on p.id = i."productId"
              where i."dishId" is not null) entries
          group by "dishId"
        ) test on test."dishId" = d.id
        UNION
        select i."groupId", p.title,
        ROUND(p.energy * count / 100, 2) as energy,
        ROUND(p.protein * count / 100, 2) as protein,
        ROUND(p.fat * count / 100, 2) as fat,
        ROUND(p.carb * count / 100, 2) as carb,
        i.id,
        null
        from ingredients i
        join products p on p.id = i."productId"
        where i."dishId" is null
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
