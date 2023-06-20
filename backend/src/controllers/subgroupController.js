const ApiError = require("../error/apiError");
const Subgroup = require("../models/subgroup");
const Set = require("../models/set");
const Ingredient = require("../models/ingredient");

class SubgroupController {
  async getOne(req, res, next) {
    const { id } = req.params;
    const subgroup = await Subgroup.findByPk(id);
    if (!subgroup) {
      return next(new ApiError(400, "subgroup is not found"));
    }
    return res.json(subgroup);
  }

  async delete(req, res, next) {
    const { id } = req.params;
    const result = await Subgroup.destroy({ where: { id } });
    return res.json(result);
  }

  async addIngredient(req, res, next) {
    const { id } = req.params;
    const { productId, count } = req.body;
    const subgroup = await Subgroup.findByPk(id);
    if (!subgroup) {
      return next(new ApiError(404, "subgroup not found"));
    }
    const ingredient = await Ingredient.create({ productId, count });
    const result = await subgroup.addIngredient(ingredient);
    return res.json(result);
  }
}

module.exports = new SubgroupController();
