const Router = require("express");
const productController = require("../controllers/productController");
const { asyncWrapper } = require("../utils");
const authMiddleware = require("../middleware/auth");
const { body } = require("express-validator");
const router = new Router();

router.get("/", authMiddleware, asyncWrapper(productController.getAll));
router.get("/:id", authMiddleware, asyncWrapper(productController.getOne));
router.post(
  "/",
  authMiddleware,
  body("title").isString(),
  body("energy").isInt(),
  body("protein").isDecimal(),
  body("fat").isDecimal(),
  body("carb").isDecimal(),
  asyncWrapper(productController.create)
);
router.put("/:id", authMiddleware, asyncWrapper(productController.update));
router.delete("/:id", authMiddleware, asyncWrapper(productController.delete));

module.exports = router;
