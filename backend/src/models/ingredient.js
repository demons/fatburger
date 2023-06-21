const { DataTypes } = require("sequelize");
const sequelize = require("../data");

const Product = require("./product");

const Ingredient = sequelize.define(
  "ingredient",
  {
    count: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { timestamps: false }
);

Ingredient.belongsTo(Product, {
  foreignKey: { allowNull: false },
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});

module.exports = Ingredient;
