const Router = require('express');
const setController = require('../controllers/setController');
const { asyncWrapper } = require('../utils');
const router = new Router();

router.get('/', asyncWrapper(setController.getAll));
router.get('/:id', asyncWrapper(setController.getOne));
router.post('/', asyncWrapper(setController.create));
router.put('/:id', asyncWrapper(setController.update));
router.delete('/:id', asyncWrapper(setController.delete));
router.post('/:id/product/:productId', asyncWrapper(setController.addProduct));
router.delete('/:id/product/:productId', asyncWrapper(setController.deleteProduct));
router.post('/:id/copy', asyncWrapper(setController.copy));

module.exports = router;
