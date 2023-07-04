"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.addColumn(
          "products",
          "weight",
          {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
          },
          { transaction: t }
        ),
      ]);
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.removeColumn("products", "weight", {
          transaction: t,
        }),
      ]);
    });
  },
};
