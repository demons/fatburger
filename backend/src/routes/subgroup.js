const Router = require("express");
const subgroupController = require("../controllers/subgroupController");
const authMiddleware = require("../middleware/auth");
const { asyncWrapper } = require("../utils");
const router = new Router();

router.get("/:id", authMiddleware, asyncWrapper(subgroupController.getOne));
router.delete("/:id", authMiddleware, asyncWrapper(subgroupController.delete));
router.post(
  "/:id/addIngredient",
  authMiddleware,
  asyncWrapper(subgroupController.addIngredient)
);

module.exports = router;
