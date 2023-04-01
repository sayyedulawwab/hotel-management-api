import { Request, Response } from 'express';
import AuthService from '../services/auth.service';
import {
  HTTP_STATUS_CODES,
  HTTP_STATUS_MESSAGES,
} from '../util/statusMessages';

class AuthController {
  static async register(req: Request, res: Response) {
    try {
      const {
        email,
        password,
        fullName,
        phone,
        dateOfBirth,
        gender,
        city,
        preferredType,
      } = req.body;

      if (email === '' || password === '') {
        res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({
          status: HTTP_STATUS_CODES.BAD_REQUEST,
          message: 'email and password are required',
        });
        return;
      }

      const avatarFilename = req.file?.filename || '';

      const newUser = {
        email: email,
        password: password,
        avatar: avatarFilename,
        fullName: fullName,
        phone: phone,
        dateOfBirth: dateOfBirth,
        gender: gender,
        city: city,
        preferredType: preferredType,
      };

      const registeredUser = await AuthService.register(newUser);

      res.status(HTTP_STATUS_CODES.CREATED).json({
        status: HTTP_STATUS_CODES.CREATED,
        email: registeredUser.email,
      });
    } catch (error: any) {
      res
        .status(error?.status || HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
        .json({
          status: error?.status || HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
          message: error?.message || HTTP_STATUS_MESSAGES.INTERNAL_SERVER_ERROR,
        });
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const { email, password: inputPassword } = req.body;

      const user = await AuthService.login(email, inputPassword);

      res
        .status(HTTP_STATUS_CODES.OK)
        .json({ status: HTTP_STATUS_CODES.OK, user });
    } catch (err: any) {
      throw new Error(err);
    }
  }

  static async logout(req: Request, res: Response) {
    res.status(HTTP_STATUS_CODES.OK).json({
      status: HTTP_STATUS_CODES.OK,
      message: 'Logged out successfully',
    });
  }
}

export default AuthController;
