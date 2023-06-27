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
