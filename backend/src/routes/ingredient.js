const Router = require("express");
const ingredientController = require("../controllers/ingredientController");
const authMiddleware = require("../middleware/auth");
const { asyncWrapper } = require("../utils");
const router = new Router();

router.delete(
  "/:id",
  authMiddleware,
  asyncWrapper(ingredientController.delete)
);

module.exports = router;
