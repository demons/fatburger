"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.addColumn(
          "products",
          "fib",
          {
            type: Sequelize.DataTypes.DDECIMAL(5, 2),
            allowNull: false,
          },
          { transaction: t }
        ),
        queryInterface.addColumn(
          "products",
          "isVisibleFib",
          {
            type: Sequelize.DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false,
          },
          { transaction: t }
        ),
      ]);
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.removeColumn("products", "fib", {
          transaction: t,
        }),
        queryInterface.removeColumn("products", "isVisibleFib", {
          transaction: t,
        }),
      ]);
    });
  },
};
