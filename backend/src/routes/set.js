const Router = require("express");
const setController = require("../controllers/setController");
const authMiddleware = require("../middleware/auth");
const { asyncWrapper } = require("../utils");
const router = new Router();

router.get("/", authMiddleware, asyncWrapper(setController.getAll));
router.get("/:id", authMiddleware, asyncWrapper(setController.getOne));
router.post("/", authMiddleware, asyncWrapper(setController.create));
router.put("/:id", authMiddleware, asyncWrapper(setController.update));
router.delete("/:id", authMiddleware, asyncWrapper(setController.delete));
router.post(
  "/:id/product/:productId",
  authMiddleware,
  asyncWrapper(setController.addProduct)
);
router.delete(
  "/:id/product/:productId",
  authMiddleware,
  asyncWrapper(setController.deleteProduct)
);
router.post("/:id/copy", authMiddleware, asyncWrapper(setController.copy));

module.exports = router;
