import { Request, Response } from 'express';
import { UserService } from '../services';
import { HTTP_STATUS_CODES, HTTP_STATUS_MESSAGES } from '../util';

class UserController {
  async getAll(req: Request, res: Response) {
    try {
      const users = await UserService.getAll();

      res.status(HTTP_STATUS_CODES.OK).json({ status: HTTP_STATUS_CODES.OK, users });
    } catch (error: any) {
      res.status(error?.status || HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json({
        status: error?.status || HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
        message: error?.message || HTTP_STATUS_MESSAGES.INTERNAL_SERVER_ERROR,
      });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const userId = req.params.userId;
      const user = await UserService.getById(userId);

      res.status(HTTP_STATUS_CODES.OK).json({ status: HTTP_STATUS_CODES.OK, user });
    } catch (error: any) {
      res.status(error?.status || HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json({
        status: error?.status || HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
        message: error?.message || HTTP_STATUS_MESSAGES.INTERNAL_SERVER_ERROR,
      });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const userId = req.params.userId;
      const changes = req.body;
      const user = await UserService.updateOne(userId, changes);

      res.status(HTTP_STATUS_CODES.OK).json({ status: HTTP_STATUS_CODES.OK, user });
    } catch (error: any) {
      res.status(error?.status || HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json({
        status: error?.status || HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
        message: error?.message || HTTP_STATUS_MESSAGES.INTERNAL_SERVER_ERROR,
      });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const userId = req.params.userId;

      const user = await UserService.deleteOne(userId);

      res.status(HTTP_STATUS_CODES.OK).json({ status: HTTP_STATUS_CODES.OK, user });
    } catch (error: any) {
      res.status(error?.status || HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json({
        status: error?.status || HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
        message: error?.message || HTTP_STATUS_MESSAGES.INTERNAL_SERVER_ERROR,
      });
    }
  }
}

export default new UserController();
