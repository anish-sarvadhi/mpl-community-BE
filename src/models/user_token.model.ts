import mongoose, { Schema, Document } from 'mongoose';

export interface IUserToken extends Document {
  user_id: mongoose.Types.ObjectId;
  token: string;
  expires_at: Date;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

const UserTokenSchema: Schema = new Schema<IUserToken>(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
    expires_at: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

UserTokenSchema.index({ token: 1 }, { unique: true });

const UserTokenModel = mongoose.model<IUserToken>('user_token', UserTokenSchema);
export default UserTokenModel;
