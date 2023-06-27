const { Product, Ingredient } = require("../db/models");
const ApiError = require("../error/apiError");

class ProductService {
  async create(userId, title, maker, energy, protein, fat, carb) {
    return await Product.create({
      userId,
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
      throw new ApiError(404, "Продукт с указанным id не найден");
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
    const countIngredients = await Ingredient.count({
      where: { productId: id },
    });
    if (countIngredients === 0) {
      return await Product.destroy({ where: { id } });
    }
    return await Product.update(
      { isDeleted: true },
      {
        where: { id },
      }
    );
  }
}

module.exports = new ProductService();
