const Router = require('express');
const subgroupController = require('../controllers/subgroupController');
const { asyncWrapper } = require('../utils');
const router = new Router();

router.get('/:id', asyncWrapper(subgroupController.getOne));
router.delete('/:id', asyncWrapper(subgroupController.delete));
router.post('/:id/addIngredient', asyncWrapper(subgroupController.addIngredient));

module.exports = router;
