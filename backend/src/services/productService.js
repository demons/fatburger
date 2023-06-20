const { Product } = require('../db/models');
const ApiError = require('../error/apiError');

class ProductService {
  async create(title, maker, energy, protein, fat, carb) {
    return await Product.create({
      title,
      maker,
      energy,
      protein,
      fat,
      carb,
    });
  }

  async getAll() {
    return await Product.findAll();
  }

  async getOne(id) {
    const product = await Product.findByPk(id);
    if (!product) {
      throw new ApiError(404, 'Продукт с указанным id не найден');
    }
    return product;
  }

  async update(id, title, maker, energy, protein, fat, carb) {
    return await Product.update(
      { title, maker, energy, protein, fat, carb },
      { where: { id } }
    );
  }

  async delete(id) {
    const result = await Product.destroy({ where: { id } });
    return result;
  }
}

module.exports = new ProductService();
