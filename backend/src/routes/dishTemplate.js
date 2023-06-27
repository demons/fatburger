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

module.exports = router;
