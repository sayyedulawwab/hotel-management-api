import bcrypt from 'bcrypt';
import { IUser, User } from '../models';
import { HTTP_STATUS_CODES } from '../util';

class UserService {
  static async getAll() {
    try {
      const users = await User.find().select('-password');
      if (!users) {
        throw {
          status: HTTP_STATUS_CODES.NOT_FOUND,
          message: `No user found`,
        };
      }

      return users;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  static async getById(userId: string) {
    try {
      const user = await User.findById(userId).select('-password');
      if (!user) {
        throw {
          status: HTTP_STATUS_CODES.NOT_FOUND,
          message: `User not found`,
        };
      }
      return user;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  static async create(newUser: any) {
    try {
      const { email, password, avatar, fullName, phone, dateOfBirth, gender, city, preferredType } = newUser;
      const user: IUser | null = await User.findOne({ email });

      if (user) {
        throw {
          status: HTTP_STATUS_CODES.CONFLICT,
          message: `user with this email '${email}' already exists`,
        };
      }

      const SALT_ROUNDS = process.env.SALT_ROUNDS || 10;
      const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

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

  static async updateOne(userId: string, changedUser: any) {
    try {
      const user: IUser | null = await User.findById(userId);

      if (!user) {
        throw {
          status: HTTP_STATUS_CODES.NOT_FOUND,
          message: 'user not found',
        };
      }

      const updatedUser = await User.findByIdAndUpdate(
        userId,
        {
          $set: changedUser,
        },
        { new: true }
      );
      console.log('🚀 ~ file: user.service.ts:89 ~ UserService ~ updateOne ~ updatedUser:', updatedUser);

      return updatedUser;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  static async deleteOne(userId: string) {
    try {
      const user: IUser | null = await User.findById(userId);

      if (!user) {
        throw {
          status: HTTP_STATUS_CODES.NOT_FOUND,
          message: 'user not found',
        };
      }

      await User.findByIdAndDelete(userId);
    } catch (error: any) {
      throw new Error(error);
    }
  }
}

export { UserService };
