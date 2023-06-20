const Router = require('express');
const ingredientController = require('../controllers/ingredientController');
const { asyncWrapper } = require('../utils');
const router = new Router();

router.delete('/:id', asyncWrapper(ingredientController.delete));

module.exports = router;
