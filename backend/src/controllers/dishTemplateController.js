const ApiError = require("../error/apiError");
const dishTemplateService = require("../services/dishTemplateService");

class DishTemplateController {
  async getAll(req, res, next) {
    const dishTemplates = await dishTemplateService.getAll(req.user.id);
    return res.json(dishTemplates);
  }

  async getOne(req, res, next) {
    const { dishTemplateId } = req.params;
    const dishTemplate = await dishTemplateService.getOne(
      req.user.id,
      dishTemplateId
    );
    return res.json(dishTemplate);
  }

  async create(req, res, next) {
    const { title, weight } = req.body;
    if (!title) {
      return next(new ApiError(400, "title is required"));
    }
    const dishTemplate = await dishTemplateService.create(
      req.user.id,
      title,
      weight
    );
    return res.json(dishTemplate);
  }

  async update(req, res, next) {
    const { dishTemplateId } = req.params;
    const { title, weight } = req.body;
    const dishTemplate = await dishTemplateService.update(
      req.user.id,
      dishTemplateId,
      title,
      weight
    );
    return res.json(dishTemplate);
  }

  async delete(req, res, next) {
    const { dishTemplateId } = req.params;
    const result = await dishTemplateService.delete(
      req.user.id,
      dishTemplateId
    );
    return res.json(result);
  }
  async addIngredient(req, res, next) {
    const { dishTemplateId } = req.params;
    const { productId, count } = req.body;
    const ingredient = await dishTemplateService.addIngredient(
      req.user.id,
      dishTemplateId,
      productId,
      count
    );
    return res.json(ingredient);
  }

  async updateIngredient(req, res, next) {
    const { dishTemplateId, ingredientId } = req.params;
    const { productId, count } = req.body;
    const result = await dishTemplateService.updateIngredient(
      req.user.id,
      dishTemplateId,
      ingredientId,
      productId,
      count
    );
    return res.json(result);
  }

  async deleteIngredient(req, res, next) {
    const { dishTemplateId, ingredientId } = req.params;
    const result = await dishTemplateService.deleteIngredient(
      req.user.id,
      dishTemplateId,
      ingredientId
    );

    return res.json(result);
  }
}

module.exports = new DishTemplateController();
