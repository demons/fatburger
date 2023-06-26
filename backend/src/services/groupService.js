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

  async addIngredient(groupId, productId, count) {
    const ingredient = await Ingredient.create({ groupId, productId, count });
    return ingredient;
  }

  async updateIngredient(groupId, ingredientId, productId, count) {
    const result = await Ingredient.update(
      { productId, count },
      { where: { groupId, id: ingredientId } }
    );
    return result;
  }
}

module.exports = new GroupService();
