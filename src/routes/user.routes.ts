import express from 'express';
import UserController from '../controllers/user.controller';
import AuthMiddleware from '../middlewares/auth.middleware';

const router = express.Router();

// GET: Get all users
router.route('/users').get(AuthMiddleware.verifyJWT, UserController.getAll);

// GET: Get user by id
router
  .route('/users/:userId')
  .get(AuthMiddleware.verifyJWT, UserController.getById);

// PUT: Update user by id
router
  .route('/users/:userId')
  .put(AuthMiddleware.verifyJWT, UserController.update);

// DELETE: Delete user by id
router
  .route('/users/:userId')
  .delete(AuthMiddleware.verifyJWT, UserController.delete);

export { router };
