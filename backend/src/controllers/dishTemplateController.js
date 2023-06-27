const ApiError = require("../error/apiError");
const dishTemplateService = require("../services/dishTemplateService");

class DishTemplateController {
  async getAll(req, res, next) {
    const dishTemplates = await dishTemplateService.getAll(req.user.id);
    return res.json(dishTemplates);
  }
}

module.exports = new DishTemplateController();
