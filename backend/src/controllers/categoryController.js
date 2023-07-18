const ApiError = require("../error/apiError");
const categoryService = require("../services/categoryService");

class CategoryController {
  async getAll(req, res, next) {
    const categories = await categoryService.getAll(req.user.id);
    return res.json(categories);
  }

  async getOne(req, res, next) {
    const { categoryId } = req.params;
    const category = await categoryService.getOne(req.user.id, categoryId);
    return res.json(category);
  }

  async create(req, res, next) {
    const { title } = req.body;
    if (!title) {
      return next(new ApiError(400, "title is required"));
    }
    const category = await categoryService.create(req.user.id, title);
    return res.json(category);
  }

  async update(req, res, next) {
    const { categoryId } = req.params;
    const { title } = req.body;
    const dishTemplate = await categoryService.update(
      req.user.id,
      categoryId,
      title
    );
    return res.json(dishTemplate);
  }

  async delete(req, res, next) {
    const { categoryId } = req.params;
    const result = await categoryService.delete(req.user.id, categoryId);
    return res.json(result);
  }
}

module.exports = new CategoryController();
