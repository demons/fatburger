const { Category } = require("../db/models");
const ApiError = require("../error/apiError");

class CategoryService {
  async getAll(userId) {
    return await Category.findAll({
      where: { userId },
      order: [["title", "ASC"]],
    });
  }

  async getOne(userId, categoryId) {
    return await Category.findOne({
      where: { userId, id: categoryId },
    });
  }

  async create(userId, title) {
    return await Category.create({ userId, title });
  }

  async update(userId, categoryId, title) {
    return await Category.update(
      { title },
      { where: { id: categoryId, userId } }
    );
  }

  async delete(userId, categoryId) {
    return await Category.destroy({
      where: { id: categoryId, userId },
    });
  }
}

module.exports = new CategoryService();
