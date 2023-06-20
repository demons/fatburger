const { DataTypes } = require('sequelize');
const sequelize = require('../data');

const Ingredient = require('./ingredient');
const Subgroup = require('./subgroup');

const Group = sequelize.define(
  'group',
  {
    title: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  { timestamps: false }
);

Group.hasMany(Ingredient, {
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});
Ingredient.belongsTo(Group);

Group.hasMany(Subgroup, {
  // foreignKey: { allowNull: false },
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});
Subgroup.belongsTo(Group);

module.exports = Group;
