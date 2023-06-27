const Router = require("express");
const router = new Router();

const group = require("./group");
const product = require("./product");
const set = require("./set");
const ingredient = require("./ingredient");
const subgroup = require("./subgroup");
const auth = require("./auth");
const dishTemplate = require("./dishTemplate");

const asyncWrapper = (cb) => {
  return async (req, res, next) => {
    try {
      return await cb(req, res, next);
    } catch (err) {
      next(err);
    }
  };
};

router.use("/groups", group);
router.use("/products", product);
router.use("/sets", set);
router.use("/ingredients", ingredient);
router.use("/subgroups", subgroup);
router.use("/dishTemplates", dishTemplate);
router.use(auth);

module.exports = router;
