import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { IUser, User } from '../models';
import { HTTP_STATUS_CODES } from '../util';

class AuthService {
  static async register(newUser: any) {
    try {
      const { email, password, avatar, fullName, phone, dateOfBirth, gender, city, preferredType } = newUser;
      const user: IUser | null = await User.findOne({ email });

      if (user) {
        throw {
          status: HTTP_STATUS_CODES.CONFLICT,
          message: `user with this email '${email}' already exists`,
        };
      }

      const SALT_ROUNDS =
        process.env.SALT_ROUNDS && Number.isInteger(process.env.SALT_ROUNDS)
          ? Number.parseInt(process.env.SALT_ROUNDS)
          : 10;

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUserToSave = new User({
        email: email,
        password: hashedPassword,
        avatar: avatar,
        fullName: fullName,
        phone: phone,
        dateOfBirth: dateOfBirth,
        gender: gender,
        city: city,
        preferredType: preferredType,
      });

      const savedUser = await newUserToSave.save();
      return savedUser;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  static async login(email: string, inputPassword: string) {
    try {
      const user = await User.findOne({ email });

      if (user === null)
        throw {
          status: HTTP_STATUS_CODES.NOT_FOUND,
          message: 'user not found',
        };

      const isPasswordValid = await bcrypt.compare(inputPassword, user.password);

      if (!isPasswordValid) {
        throw {
          status: HTTP_STATUS_CODES.UNAUTHORIZED,
          message: 'Wrong password',
        };
      }

      // Password is valid, generate a JWT token
      const JWT_SECRET: any = process.env.JWT_SECRET;

      const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
        expiresIn: '1h',
      });

      const { password, ...others } = user._doc;

      const loggedInUser = { ...others, token };

      return loggedInUser;
    } catch (error: any) {
      throw new Error(error);
    }
  }
}

export { AuthService };
