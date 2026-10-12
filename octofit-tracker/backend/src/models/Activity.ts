import { Document, Schema, Types, model } from 'mongoose';

export type ActivityType =
  | 'running'
  | 'cycling'
  | 'swimming'
  | 'walking'
  | 'strength'
  | 'yoga'
  | 'other';

export interface IActivity extends Document {
  user: Types.ObjectId;
  type: ActivityType;
  durationMinutes: number;
  caloriesBurned: number;
  date: Date;
}

const activitySchema = new Schema<IActivity>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type: {
    type: String,
    enum: ['running', 'cycling', 'swimming', 'walking', 'strength', 'yoga', 'other'],
    required: true,
  },
  durationMinutes: { type: Number, required: true },
  caloriesBurned: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

export default model<IActivity>('Activity', activitySchema);
