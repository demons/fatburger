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
router.post(
  "/:id/ingredient",
  authMiddleware,
  asyncWrapper(groupController.addIngredient)
);

module.exports = router;
