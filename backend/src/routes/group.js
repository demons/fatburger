const Router = require("express");
const groupController = require("../controllers/groupController");
const dishController = require("../controllers/dishController");
const authMiddleware = require("../middleware/auth");
const { asyncWrapper } = require("../utils");
const router = new Router();

router.get("/", authMiddleware, asyncWrapper(groupController.getAll));
router.get("/:id", authMiddleware, asyncWrapper(groupController.getOne));
router.post("/", authMiddleware, asyncWrapper(groupController.create));
router.put("/:id", authMiddleware, asyncWrapper(groupController.update));
router.delete("/:id", authMiddleware, asyncWrapper(groupController.delete));

// Ingredients
router.post(
  "/:groupId/ingredients",
  authMiddleware,
  asyncWrapper(groupController.addIngredient)
);
router.put(
  "/:groupId/ingredients/:ingredientId",
  authMiddleware,
  asyncWrapper(groupController.updateIngredient)
);
router.delete(
  "/:groupId/ingredients/:ingredientId",
  authMiddleware,
  asyncWrapper(groupController.deleteIngredient)
);

// Dishes
router.get(
  "/:groupId/dishes/:dishId",
  authMiddleware,
  asyncWrapper(groupController.getDish)
);
router.post(
  "/:groupId/dishes",
  authMiddleware,
  asyncWrapper(groupController.addDish)
);
router.delete(
  "/:groupId/dishes/:dishId",
  authMiddleware,
  asyncWrapper(groupController.deleteDish)
);

// Dishe's Ingredients
router.post(
  "/:groupId/dishes/:dishId/ingredients",
  authMiddleware,
  asyncWrapper(dishController.addIngredient)
);
router.put(
  "/:groupId/dishes/:dishId/ingredients/:ingredientId",
  authMiddleware,
  asyncWrapper(dishController.updateIngredient)
);
router.delete(
  "/:groupId/dishes/:dishId/ingredients/:ingredientId",
  authMiddleware,
  asyncWrapper(dishController.deleteIngredient)
);

module.exports = router;
