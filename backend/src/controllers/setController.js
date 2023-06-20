const sequelize = require('../data');
const ApiError = require('../error/apiError');
const Group = require('../models/group');
const Ingredient = require('../models/ingredient');
const Product = require('../models/product');
const Set = require('../models/set');
const Subgroup = require('../models/subgroup');

class ProductController {
  async getAll(req, res, next) {
    const sets = await Set.findAll();
    return res.json(sets);
  }

  async getOne(req, res, next) {
    const { id } = req.params;
    const set = await Set.findByPk(id);
    if (!set) {
      return next(new ApiError(400, 'set is not found'));
    }
    return res.json(set);
  }

  async create(req, res, next) {
    const { title } = req.body;
    if (!title) {
      return next(new ApiError(400, 'title is required'));
    }
    const set = await Set.create({ title });
    return res.json(set);
  }

  async update(req, res, next) {
    const { id } = req.params;
    const { title } = req.body;
    const set = await Set.update({ title }, { where: { id } });
    return res.json(set);
  }

  async delete(req, res, next) {
    const { id } = req.params;
    const result = await Set.destroy({ where: { id } });
    return res.json(result);
  }

  async addProduct(req, res, next) {
    const { id, productId } = req.params;

    // find set
    const set = await Set.findByPk(id);
    if (!set) {
      return next(new ApiError(404, 'set is not found'));
    }

    // find product
    const product = await Product.findByPk(productId);
    if (!product) {
      return next(new ApiError(404, 'product is not found'));
    }

    const result = await set.addProduct(product);
    return res.json(result);
  }

  async deleteProduct(req, res, next) {
    const { id, productId } = req.params;
    const set = await Set.findByPk(id);
    if (!set) {
      return next(new ApiError(404, 'set is not found'));
    }
    const result = await set.removeProduct(productId);
    return res.json(result);
  }

  async copy(req, res, next) {
    const { id } = req.params;
    const { groupId } = req.body;
    if (!groupId) {
      return next(new ApiError(400, 'groupId is required'));
    }

    const t = await sequelize.transaction();

    try {
      const group = await Group.findByPk(groupId);
      if (!group) {
        return next(new ApiError(404, 'group not found'));
      }

      const set = await Set.findByPk(id);
      if (!set) {
        return next(new ApiError(404, 'set not found'));
      }
      const subgroup = await Subgroup.create({ title: set.title });
      await group.addSubgroup(subgroup);

      const products = await set.getProducts({ attributes: ['id'], raw: true });
      products.forEach(async ({ id }) => {
        const ingredient = await Ingredient.create({ productId: id, count: 0 });
        subgroup.addIngredient(ingredient);
      });
      await t.commit();
      return res.json(subgroup);
    } catch (err) {
      await t.roolback();
      return next(new ApiError(500, 'something wrong'));
    }
  }
}

module.exports = new ProductController();
