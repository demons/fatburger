"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.changeColumn(
          "stories",
          "energy",
          {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: true,
          },
          { transaction: t }
        ),
        queryInterface.changeColumn(
          "stories",
          "protein",
          {
            type: Sequelize.DataTypes.DECIMAL(5, 2),
            allowNull: true,
          },
          { transaction: t }
        ),
        queryInterface.changeColumn(
          "stories",
          "fat",
          {
            type: Sequelize.DataTypes.DECIMAL(5, 2),
            allowNull: true,
          },
          { transaction: t }
        ),
        queryInterface.changeColumn(
          "stories",
          "carb",
          {
            type: Sequelize.DataTypes.DECIMAL(5, 2),
            allowNull: true,
          },
          { transaction: t }
        ),
        queryInterface.changeColumn(
          "stories",
          "fib",
          {
            type: Sequelize.DataTypes.DECIMAL(5, 2),
            allowNull: true,
          },
          { transaction: t }
        ),
        queryInterface.addColumn(
          "stories",
          "weight",
          {
            type: Sequelize.DataTypes.DECIMAL(3, 1),
            allowNull: true,
          },
          { transaction: t }
        ),
      ]);
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.removeColumn("stories", "weight", {
          transaction: t,
        }),
      ]);
    });
  },
};
