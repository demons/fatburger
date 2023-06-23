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
        target[curr.id] = curr;
        target[curr.id].groupItems = [];
        return target;
      }, {});

      groupItems.forEach((groupItem) => {
        const group = groups[groupItem.groupId];
        group.groupItems.push(groupItem);
      });

      return Object.values(groups);
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
