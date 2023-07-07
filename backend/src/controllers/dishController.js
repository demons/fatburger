const ApiError = require("../error/apiError");
const dishService = require("../services/dishService");

class DishController {
  async update(req, res, next) {
    const { groupId, dishId } = req.params;
    const { title, weight, count } = req.body;
    const dish = await dishService.update(
      req.user.id,
      groupId,
      dishId,
      title,
      weight,
      count
    );
    return res.json(dish);
  }

  async addIngredient(req, res, next) {
    const { groupId, dishId } = req.params;
    const { productId, count } = req.body;
    const ingredient = await dishService.addIngredient(
      req.user.id,
      groupId,
      dishId,
      productId,
      count
    );
    return res.json(ingredient);
  }

  async updateIngredient(req, res, next) {
    const { groupId, dishId, ingredientId } = req.params;
    const { productId, count } = req.body;
    const result = await dishService.updateIngredient(
      req.user.id,
      groupId,
      dishId,
      ingredientId,
      productId,
      count
    );
    return res.json(result);
  }

  async deleteIngredient(req, res, next) {
    const { groupId, dishId, ingredientId } = req.params;
    const result = await dishService.deleteIngredient(
      req.user.id,
      groupId,
      dishId,
      ingredientId
    );
    return res.json(result);
  }
}

module.exports = new DishController();
