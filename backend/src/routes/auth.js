const Router = require('express');
const userController = require('../controllers/userController');
const { asyncWrapper } = require('../utils');
const { body } = require('express-validator');
const authMiddleware = require('../middleware/auth');
const router = new Router();

// router.post(
//   '/registration',
//   body('email').isEmail(),
//   body('password').isLength({ min: 3, max: 32 }),
//   asyncWrapper(userController.registration)
// );
// router.post(
//   '/login',
//   body('email').isEmail(),
//   body('password').isString(),
//   asyncWrapper(userController.login)
// );
router.post('/logout', asyncWrapper(userController.logout));
router.post(
  '/google/callback',
  body('credential').isString(),
  asyncWrapper(userController.loginWithGoogle)
);
// router.get('/activate/:link', asyncWrapper(userController.activate));
router.get('/refresh', asyncWrapper(userController.refresh));
router.get('/users', authMiddleware, asyncWrapper(userController.getUsers));

module.exports = router;
