"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.addColumn(
          "stories",
          "fib",
          {
            type: Sequelize.DataTypes.DECIMAL(5, 2),
            allowNull: false,
            defaultValue: 0,
          },
          { transaction: t }
        ),
      ]);
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.removeColumn("stories", "fib", {
          transaction: t,
        }),
      ]);
    });
  },
};
