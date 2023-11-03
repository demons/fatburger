const Router = require("express");
const storyController = require("../controllers/storyController");
const authMiddleware = require("../middleware/auth");
const { asyncWrapper } = require("../utils");
const router = new Router();

router.get("/", authMiddleware, asyncWrapper(storyController.getAll));
router.get("/:storyId", authMiddleware, asyncWrapper(storyController.getOne));
router.post("/", authMiddleware, asyncWrapper(storyController.create));
router.put("/:storyId", authMiddleware, asyncWrapper(storyController.update));
router.delete(
  "/:storyId",
  authMiddleware,
  asyncWrapper(storyController.delete)
);

module.exports = router;
