import mongoose, { Document, Schema, Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { createJWToken } from '../config/auth';
import { environment } from '../config';

const { secret } = environment;

// 1. Define the interface
export interface IUser extends Document {
  first_name?: string;
  last_name?: string;
  user_name?: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;

  // Methods
  generateToken(): string;
  authenticate(value: string): boolean;
}

// 2. Define the schema
const UserSchema: Schema<IUser> = new Schema<IUser>(
  {
    first_name: { type: String },
    last_name: { type: String },
    user_name: { type: String },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt
  }
);

// 3. Hooks - hash password before save
UserSchema.pre<IUser>('save', function (next) {
  if (this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(10));
  }
  next();
});

// 4. Methods
UserSchema.methods.generateToken = function (): string {
  return createJWToken({ email: this.email, id: this._id });
};

UserSchema.methods.authenticate = function (value: string): boolean {
  return bcrypt.compareSync(value, this.password);
};

// 5. Export the model
const User: Model<IUser> = mongoose.model<IUser>('User', UserSchema);
export default User;