import { Document, Model, Schema, Types, model } from 'mongoose';

export interface ILeaderboardEntry extends Document {
  user: Types.ObjectId;
  team?: Types.ObjectId;
  points: number;
}

const leaderboardSchema: Schema<ILeaderboardEntry> = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  team: { type: Schema.Types.ObjectId, ref: 'Team' },
  points: { type: Number, required: true, default: 0 },
});

const Leaderboard = model('Leaderboard', leaderboardSchema) as Model<ILeaderboardEntry>;

export default Leaderboard;
