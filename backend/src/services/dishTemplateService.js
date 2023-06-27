const { DishTemplate } = require("../db/models");
const ApiError = require("../error/apiError");

class DishTemplateService {
  async getAll(userId) {
    return await DishTemplate.findAll({ where: { userId } });
  }

  async getOne(userId, dishTemplateId) {
    return await DishTemplate.findOne({
      where: { userId, id: dishTemplateId },
    });
  }
}

module.exports = new DishTemplateService();
