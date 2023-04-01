import express from 'express';
import UserController from '../../controllers/user.controller';


export const router = express.Router();



// GET: Get all users
router.route("/users").get(UserController.getAll);

// GET: Get user by id
router.route("/users/:userId").get(UserController.getById);

// PUT: Update user by id
router.route("/users/:userId").put(UserController.update);

// DELETE: Delete user by id
router.route("/users/:userId").delete(UserController.delete);
