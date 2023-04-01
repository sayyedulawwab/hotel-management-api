import { Request, Response } from 'express';
import {
  deleteOneUser,
  getAllUsers,
  getUserById,
  updateOneUser,
} from '../services/user.service';
import {
  HTTP_STATUS_CODES,
  HTTP_STATUS_MESSAGES,
} from '../util/statusMessages';

class UserController {
  static async getAll(req: Request, res: Response) {
    try {
      const users = await getAllUsers();

      res
        .status(HTTP_STATUS_CODES.OK)
        .json({ status: HTTP_STATUS_CODES.OK, users });
    } catch (error: any) {
      res
        .status(error?.status || HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
        .json({
          status: error?.status || HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
          message: error?.message || HTTP_STATUS_MESSAGES.INTERNAL_SERVER_ERROR,
        });
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const userId = req.params.userId;
      const user = await getUserById(userId);

      res
        .status(HTTP_STATUS_CODES.OK)
        .json({ status: HTTP_STATUS_CODES.OK, user });
    } catch (error: any) {
      res
        .status(error?.status || HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
        .json({
          status: error?.status || HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
          message: error?.message || HTTP_STATUS_MESSAGES.INTERNAL_SERVER_ERROR,
        });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const { userId, ...changes } = req.body;

      const user = await updateOneUser(userId, changes);

      res
        .status(HTTP_STATUS_CODES.OK)
        .json({ status: HTTP_STATUS_CODES.OK, user });
    } catch (error: any) {
      res
        .status(error?.status || HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
        .json({
          status: error?.status || HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
          message: error?.message || HTTP_STATUS_MESSAGES.INTERNAL_SERVER_ERROR,
        });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const userId = req.body.userId;

      const user = await deleteOneUser(userId);

      res
        .status(HTTP_STATUS_CODES.OK)
        .json({ status: HTTP_STATUS_CODES.OK, user });
    } catch (error: any) {
      res
        .status(error?.status || HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
        .json({
          status: error?.status || HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
          message: error?.message || HTTP_STATUS_MESSAGES.INTERNAL_SERVER_ERROR,
        });
    }
  }
}

export default UserController;
