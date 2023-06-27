const { DishTemplate, Ingredient } = require("../db/models");
const ApiError = require("../error/apiError");

class DishTemplateService {
  async getAll(userId) {
    return await DishTemplate.findAll({ where: { userId } });
  }

  async getOne(userId, dishTemplateId) {
    const dishTemplate = await DishTemplate.findOne({
      where: { userId, id: dishTemplateId },
    });

    const ingredients = await DishTemplate.getIngredients(
      userId,
      dishTemplateId
    );

    const result = {
      ...dishTemplate.toJSON(),
      ingredients,
    };

    return result;
  }

  async addIngredient(userId, dishTemplateId, productId, count) {
    const dishTemplate = await DishTemplate.findOne({
      where: { id: dishTemplateId, userId },
    });
    if (!dishTemplate) {
      throw new ApiError(404, "Шаблон блюда с указанным id не найден");
    }
    const ingredient = await Ingredient.create({
      dishTemplateId,
      productId,
      count,
    });
    return ingredient;
  }

  async deleteIngredient(userId, dishTemplateId, ingredientId) {
    const dishTemplate = await DishTemplate.findOne({
      where: { userId, id: dishTemplateId },
    });
    if (!dishTemplate) {
      throw new ApiError(404, "Шаблон блюда с указанным id не найден");
    }
    const result = await Ingredient.destroy({ where: { id: ingredientId } });
    return result;
  }
}

module.exports = new DishTemplateService();
