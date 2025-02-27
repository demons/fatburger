const { Product, Ingredient } = require("../db/models");
const ApiError = require("../error/apiError");

class ProductService {
  async create(
    userId,
    title,
    maker,
    energy,
    protein,
    fat,
    carb,
    fib,
    weight,
    isVisibleFib,
    categoryId
  ) {
    return await Product.create({
      userId,
      title,
      maker,
      energy,
      protein,
      fat,
      carb,
      fib,
      weight,
      isVisibleFib,
      categoryId,
    });
  }

  async getAll(userId) {
    return await Product.findAll({
      where: { userId },
      order: [["title", "ASC"]],
    });
  }

  async getOne(userId, productId) {
    const product = await Product.findOne({ where: { userId, id: productId } });
    if (!product) {
      throw new ApiError(404, "Продукт с указанным id не найден");
    }
    return product;
  }

  async update(
    userId,
    id,
    title,
    maker,
    energy,
    protein,
    fat,
    carb,
    fib,
    weight,
    isVisibleFib,
    categoryId
  ) {
    return await Product.update(
      {
        title,
        maker,
        energy,
        protein,
        fat,
        carb,
        fib,
        weight,
        isVisibleFib,
        categoryId,
      },
      { where: { userId, id } }
    );
  }

  async delete(userId, id) {
    const product = await Product.findOne({
      where: { userId, id },
      include: Ingredient,
    });

    if (product.toJSON().ingredients.length === 0) {
      return await Product.destroy({ where: { userId, id } });
    }
    return await Product.update(
      { isDeleted: true },
      {
        where: { userId, id },
      }
    );
  }
}

module.exports = new ProductService();
