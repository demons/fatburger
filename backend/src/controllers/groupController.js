const ApiError = require("../error/apiError");
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
    const ingredient = groupService.addIngredient(id, productId, count);
    return res.json(ingredient);
  }
}

module.exports = new GroupController();
