"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.addColumn(
          "dishes",
          "weight",
          {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
          },
          { transaction: t }
        ),
        queryInterface.addColumn(
          "dishes",
          "count",
          {
            type: Sequelize.DataTypes.INTEGER,
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
        queryInterface.removeColumn("dishes", "weight", {
          transaction: t,
        }),
        queryInterface.removeColumn("dishes", "count", {
          transaction: t,
        }),
      ]);
    });
  },
};
