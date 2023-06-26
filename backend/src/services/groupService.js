const { Group, Ingredient } = require("../db/models");
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

  async addIngredient(userId, groupId, productId, count) {
    const group = await Group.findOne({ where: { id: groupId, userId } });
    if (!group) {
      throw new ApiError(404, "Группа с указанным id не найдена");
    }
    const ingredient = await Ingredient.create({ groupId, productId, count });
    return ingredient;
  }

  async updateIngredient(userId, groupId, ingredientId, productId, count) {
    const group = await Group.findOne({ where: { id: groupId, userId } });
    if (!group) {
      throw new ApiError(404, "Группа с указанным id не найдена");
    }
    const result = await Ingredient.update(
      { productId, count },
      { where: { id: ingredientId } }
    );
    return result;
  }

  async deleteIngredient(userId, groupId, ingredientId) {
    const group = await Group.findOne({ where: { id: groupId, userId } });
    if (!group) {
      throw new ApiError(404, "Группа с указанным id не найдена");
    }
    const result = await Ingredient.destroy({ where: { id: ingredientId } });
    return result;
  }
}

module.exports = new GroupService();
