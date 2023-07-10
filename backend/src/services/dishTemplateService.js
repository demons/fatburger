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

  async create(userId, title, weight) {
    return await DishTemplate.create({ userId, title, weight });
  }

  async update(userId, dishTemplateId, title, weight) {
    return await DishTemplate.update(
      { title, weight },
      { where: { id: dishTemplateId, userId } }
    );
  }

  async delete(userId, dishTemplateId) {
    const result = await DishTemplate.destroy({
      where: { id: dishTemplateId, userId },
    });
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

  async updateIngredient(
    userId,
    dishTemplateId,
    ingredientId,
    productId,
    count
  ) {
    const dishTemplate = await DishTemplate.findOne({
      where: { id: dishTemplateId, userId },
    });
    if (!dishTemplate) {
      throw new ApiError(404, "Шаблон блюда с указанным id не найдена");
    }
    const result = await Ingredient.update(
      { productId, count },
      { where: { id: ingredientId } }
    );
    return result;
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
