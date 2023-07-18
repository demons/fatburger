const Router = require("express");
const categoryController = require("../controllers/categoryController");
const authMiddleware = require("../middleware/auth");
const { asyncWrapper } = require("../utils");
const router = new Router();

router.get("/", authMiddleware, asyncWrapper(categoryController.getAll));
router.get(
  "/:categoryId",
  authMiddleware,
  asyncWrapper(categoryController.getOne)
);
router.post("/", authMiddleware, asyncWrapper(categoryController.create));
router.put(
  "/:categoryId",
  authMiddleware,
  asyncWrapper(categoryController.update)
);
router.delete(
  "/:categoryId",
  authMiddleware,
  asyncWrapper(categoryController.delete)
);

module.exports = router;
