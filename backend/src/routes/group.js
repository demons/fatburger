const Router = require("express");
const groupController = require("../controllers/groupController");
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

module.exports = router;
