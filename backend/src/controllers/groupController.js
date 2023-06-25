const ApiError = require("../error/apiError");
const { Group } = require("../db/models");
const Ingredient = require("../models/ingredient");
const groupService = require("../services/groupService");

class GroupController {
  async getAll(req, res, next) {
    const groups = await groupService.getAll(req.user.id);
    return res.json(groups);
  }

  async getOne(req, res, next) {
    const { id } = req.params;
    const group = await groupService.getOne(req.user.id, id);
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
    const result = await groupService.delete(req.user.id, id);
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
