import mongoose, { Schema } from 'mongoose';

interface IUser extends Document {
  email: string;
  password: string;
  avatar?: string;
  fullName?: string;
  phone?: string;
  dateOfBirth?: Date;
  gender?: 'male' | 'female' | 'other';
  city?: string;
  preferredType?: 'hotel' | 'restaurant';
  rewardPoints?: number;
  usedRewardPoints?: number;
  promoCode?: string;
  savedBDT?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

const userSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String },
    avatar: String,
    fullName: String,
    phone: String,
    dateOfBirth: Date,
    gender: { type: String, enum: ['male', 'female', 'other'] },
    city: String,
    preferredType: { type: String, enum: ['hotel', 'restaurant'] },
    rewardPoints: { type: Number, default: 0 },
    usedRewardPoints: { type: Number, default: 0 },
    promoCode: String,
    savedBDT: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const User = mongoose.model<IUser>('User', userSchema);

export { User, IUser };
