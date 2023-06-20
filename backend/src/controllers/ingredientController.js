const ApiError = require('../error/apiError');
const Ingredient = require('../models/ingredient');

class IngredientController {
  async delete(req, res, next) {
    const { id } = req.params;
    const result = await Ingredient.destroy({ where: { id } });
    return res.json(result);
  }
}

module.exports = new IngredientController();
