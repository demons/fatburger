const ApiError = require('../error/apiError');
const { validationResult } = require('express-validator');
const productService = require('../services/productService');

class ProductController {
  async getAll(req, res, next) {
    const products = await productService.getAll();
    return res.json(products);
  }

  async getOne(req, res, next) {
    const { id } = req.params;
    const product = await productService.getOne(id);
    return res.json(product);
  }

  async create(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(ApiError.badRequest('Указаны не все параметры', errors.array()));
    }
    const { title, maker = '', energy, protein, fat, carb } = req.body;
    const product = await productService.create(
      title,
      maker,
      energy,
      protein,
      fat,
      carb
    );
    return res.json(product);
  }

  async update(req, res, next) {
    const { id } = req.params;
    const { title, maker, energy, protein, fat, carb } = req.body;

    const product = await productService.update(
      id,
      title,
      maker,
      energy,
      protein,
      fat,
      carb
    );
    return res.json(product);
  }

  async delete(req, res, next) {
    const { id } = req.params;
    const result = await productService.delete(id);
    return res.json(result);
  }
}

module.exports = new ProductController();
