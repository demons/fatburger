const { Group, Ingredient, Dish } = require("../db/models");
const ApiError = require("../error/apiError");

class DishService {
  async update(userId, groupId, dishId, title, weight, count) {
    const group = await Group.findOne({ where: { id: groupId, userId } });
    if (!group) {
      throw new ApiError(404, "Группа с указанным id не найдена");
    }
    return await Dish.update(
      { title, weight, count },
      { where: { id: dishId } }
    );
  }

  async addIngredient(userId, groupId, dishId, productId, count) {
    const group = await Group.findOne({ where: { id: groupId, userId } });
    if (!group) {
      throw new ApiError(404, "Группа с указанным id не найдена");
    }
    const ingredient = await Ingredient.create({ dishId, productId, count });
    return ingredient;
  }

  async updateIngredient(
    userId,
    groupId,
    dishId,
    ingredientId,
    productId,
    count
  ) {
    const group = await Group.findOne({ where: { id: groupId, userId } });
    if (!group) {
      throw new ApiError(404, "Группа с указанным id не найдена");
    }
    const result = await Ingredient.update(
      { productId, count },
      { where: { id: ingredientId, dishId } }
    );
    return result;
  }

  async deleteIngredient(userId, groupId, dishId, ingredientId) {
    const group = await Group.findOne({ where: { id: groupId, userId } });
    if (!group) {
      throw new ApiError(404, "Группа с указанным id не найдена");
    }
    const result = await Ingredient.destroy({
      where: { id: ingredientId, dishId },
    });
    return result;
  }
}

module.exports = new DishService();
