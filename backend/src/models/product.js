const { DataTypes } = require("sequelize");
const sequelize = require("../data");

const Product = sequelize.define(
  "product",
  {
    title: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    maker: DataTypes.STRING(100),
    energy: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    protein: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false,
    },
    fat: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false,
    },
    carb: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false,
    },
  },
  { timestamps: false }
);

module.exports = Product;
