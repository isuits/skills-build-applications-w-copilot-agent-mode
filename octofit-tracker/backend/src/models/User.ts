import { Document, Schema, Types, model } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  age?: number;
  team?: Types.ObjectId;
  createdAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number },
    team: { type: Schema.Types.ObjectId, ref: 'Team' },
  },
  { timestamps: { createdAt: true, updatedAt: false } },
);

export default model<IUser>('User', userSchema);
