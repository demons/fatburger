const ApiError = require("../error/apiError");
const { validationResult } = require("express-validator");
const productService = require("../services/productService");

class ProductController {
  async getAll(req, res, next) {
    const products = await productService.getAll(req.user.id);
    return res.json(products);
  }

  async getOne(req, res, next) {
    const { id } = req.params;
    const product = await productService.getOne(req.user.id, id);
    return res.json(product);
  }

  async create(req, res, next) {
    const { title, maker = "", energy, protein, fat, carb, weight } = req.body;
    const product = await productService.create(
      req.user.id,
      title,
      maker,
      energy,
      protein,
      fat,
      carb,
      weight
    );
    return res.json(product);
  }

  async update(req, res, next) {
    const { id } = req.params;
    const { title, maker, energy, protein, fat, carb, weight } = req.body;

    const product = await productService.update(
      req.user.id,
      id,
      title,
      maker,
      energy,
      protein,
      fat,
      carb,
      weight
    );
    return res.json(product);
  }

  async delete(req, res, next) {
    const { id } = req.params;
    const result = await productService.delete(req.user.id, id);
    return res.json(result);
  }
}

module.exports = new ProductController();
