import { Document, Schema, Types, model } from 'mongoose';

export interface ILeaderboardEntry extends Document {
  user: Types.ObjectId;
  team?: Types.ObjectId;
  points: number;
}

const leaderboardSchema = new Schema<ILeaderboardEntry>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  team: { type: Schema.Types.ObjectId, ref: 'Team' },
  points: { type: Number, required: true, default: 0 },
});

export default model<ILeaderboardEntry>('Leaderboard', leaderboardSchema);
