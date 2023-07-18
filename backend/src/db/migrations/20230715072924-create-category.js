"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let transaction;
    try {
      transaction = await queryInterface.sequelize.transaction();

      await queryInterface.createTable(
        "categories",
        {
          id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
          },
          title: {
            type: Sequelize.STRING(50),
          },
          userId: {
            type: Sequelize.INTEGER,
            references: { model: "users", key: "id" },
          },
        },
        { transaction }
      );

      await queryInterface.addColumn(
        "products",
        "categoryId",
        {
          type: Sequelize.INTEGER,
          references: { model: "categories", key: "id" },
          onDelete: "SET NULL",
          onUpdate: "CASCADE",
        },
        { transaction }
      );

      await transaction.commit();
    } catch (err) {
      if (transaction) await transaction.rollback();
    }
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("products", "categoryId");
    await queryInterface.dropTable("categories");
  },
};
