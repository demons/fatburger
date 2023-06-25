const ApiError = require("../error/apiError");
const Group = require("../models/group");
const Ingredient = require("../models/ingredient");
const Subgroup = require("../models/subgroup");
const groupService = require("../services/groupService");

const include = {
  include: [
    { model: Ingredient, attributes: ["id", "productId", "count"] },
    {
      model: Subgroup,
      include: { model: Ingredient, attributes: ["id", "productId", "count"] },
    },
  ],
};

class GroupController {
  async getAll(req, res, next) {
    const groups = await Group.findAll({ ...include });
    return res.json(groups);
  }

  async getOne(req, res, next) {
    const { id } = req.params;
    const group = await Group.findByPk(id, { ...include });
    if (!group) {
      return next(new ApiError(404, "group is not found"));
    }
    return res.json(group);
  }

  async create(req, res, next) {
    const { title } = req.body;
    if (!title) {
      return next(new ApiError(400, "title is required"));
    }
    const group = await groupService.create(req.user.id, title);
    return res.json(group);
  }

  async update(req, res, next) {
    const { id } = req.params;
    const { title } = req.body;
    const group = await groupService.update(req.user.id, id, title);
    return res.json(group);
  }

  async delete(req, res, next) {
    const { id } = req.params;
    const result = await Group.destroy({ where: { id } });
    return res.json(result);
  }

  async addIngredient(req, res, next) {
    const { id } = req.params;
    const { productId, count } = req.body;
    const group = await Group.findByPk(id);
    if (!group) {
      return next(new ApiError(404, "group is not found"));
    }
    const ingredient = await Ingredient.create({ productId, count });
    group.addIngredient(ingredient);
    return res.json();
  }
}

module.exports = new GroupController();
