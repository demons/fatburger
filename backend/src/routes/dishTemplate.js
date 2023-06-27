const Router = require("express");
const dishTemplateController = require("../controllers/dishTemplateController");
const authMiddleware = require("../middleware/auth");
const { asyncWrapper } = require("../utils");
const router = new Router();

router.get("/", authMiddleware, asyncWrapper(dishTemplateController.getAll));
router.get(
  "/:dishTemplateId",
  authMiddleware,
  asyncWrapper(dishTemplateController.getOne)
);

// Ingredients
router.post(
  "/:dishTemplateId/ingredients",
  authMiddleware,
  asyncWrapper(dishTemplateController.addIngredient)
);
router.delete(
  "/:dishTemplateId/ingredients/:ingredientId",
  authMiddleware,
  asyncWrapper(dishTemplateController.deleteIngredient)
);

module.exports = router;
