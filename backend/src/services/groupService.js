const { Group, Ingredient, sequelize } = require("../db/models");
const ApiError = require("../error/apiError");

class GroupService {
  async create(userId, title) {
    return await Group.create({ userId, title });
  }

  async getAll(userId) {
    return await Group.getGroups(userId);
  }

  async getOne(userId, groupId) {
    const group = await Group.getGroup(userId, groupId);
    if (!group) {
      throw new ApiError(404, "Группа с указанным id не найденаы");
    }
    return group;
  }

  async update(userId, groupId, title) {
    return await Group.update({ title }, { where: { id: groupId, userId } });
  }

  async delete(userId, groupId) {
    const result = await Group.destroy({ where: { id: groupId, userId } });
    return result;
  }

  async addIngredient(groupId, productId, count) {
    const ingredient = await Ingredient.create({ groupId, productId, count });
    return ingredient;
  }

  async updateIngredient(userId, groupId, ingredientId, productId, count) {
    return await sequelize.query(`
      UPDATE ingredients
      SET "productId"=${productId}, count=${count}
      WHERE id = (
        SELECT i.id FROM ingredients i
        LEFT JOIN groups g ON g.id = ${groupId}
        WHERE g."userId" = ${userId} AND i.id = ${ingredientId}
      )
    `);
  }

  async deleteIngredient(userId, groupId, ingredientId) {
    const result = await sequelize.query(`
      DELETE FROM ingredients i
      WHERE id = (
        SELECT i.id FROM ingredients i
        LEFT JOIN groups g ON g.id = ${groupId}
        WHERE g."userId" = ${userId} AND i.id = ${ingredientId}
      )
    `);
    return result;
  }
}

module.exports = new GroupService();
