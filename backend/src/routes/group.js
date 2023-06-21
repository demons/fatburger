const Router = require("express");
const groupController = require("../controllers/groupController");
const { asyncWrapper } = require("../utils");
const router = new Router();

router.get("/", asyncWrapper(groupController.getAll));
router.get("/:id", asyncWrapper(groupController.getOne));
router.post("/", asyncWrapper(groupController.create));
router.put("/:id", asyncWrapper(groupController.update));
router.delete("/:id", asyncWrapper(groupController.delete));
router.post("/:id/addIngredient", asyncWrapper(groupController.addIngredient));

module.exports = router;
