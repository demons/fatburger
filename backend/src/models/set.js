const { DataTypes } = require("sequelize");
const sequelize = require("../data");
const Product = require("./product");

const Set = sequelize.define(
  "set",
  {
    title: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  { timestamps: false }
);

const SetProducts = sequelize.define(
  "setProducts",
  {
    setId: {
      type: DataTypes.INTEGER,
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
      references: {
        model: Set,
        key: "id",
      },
    },
    productId: {
      type: DataTypes.INTEGER,
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
      references: {
        model: Product,
        key: "id",
      },
    },
  },
  { timestamps: false }
);
Set.belongsToMany(Product, { through: SetProducts });

module.exports = Set;
