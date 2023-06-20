const { DataTypes } = require('sequelize');
const sequelize = require('../data');

const Ingredient = require('./ingredient');

const Subgroup = sequelize.define(
  'subgroup',
  {
    title: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  { timestamps: false }
);

Subgroup.hasMany(Ingredient, {
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});
Ingredient.belongsTo(Subgroup);

module.exports = Subgroup;
