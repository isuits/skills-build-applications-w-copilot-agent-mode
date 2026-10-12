import { Document, Model, Schema, Types, model } from 'mongoose';

export interface ITeam extends Document {
  name: string;
  members: Types.ObjectId[];
  createdAt: Date;
}

const teamSchema: Schema<ITeam> = new Schema(
  {
    name: { type: String, required: true, unique: true },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: { createdAt: true, updatedAt: false } },
);

const Team = model('Team', teamSchema) as Model<ITeam>;

export default Team;
