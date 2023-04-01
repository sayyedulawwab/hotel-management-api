import bcrypt from 'bcrypt';
import { IUser, User } from '../models/user.model';
import { HTTP_STATUS_CODES } from '../util/statusMessages';

const getAllUsers = async () => {
  try {
    const users = await User.find();
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
};

const getUserById = async (userId: string) => {
  try {
    const user = await User.findById(userId);
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
};

const createNewUser = async (newUser: any) => {
  try {
    const {
      email,
      password,
      avatar,
      fullName,
      phone,
      dateOfBirth,
      gender,
      city,
      preferredType,
    } = newUser;
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
};

const updateOneUser = async (userId: string, changedUser: any) => {
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

    return updatedUser;
  } catch (error: any) {
    throw new Error(error);
  }
};

const deleteOneUser = async (userId: string) => {
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
};

export {
  getAllUsers,
  getUserById,
  createNewUser,
  updateOneUser,
  deleteOneUser,
};