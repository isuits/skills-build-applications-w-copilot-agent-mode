import { Document, Model, Schema, model } from 'mongoose';

export type WorkoutDifficulty = 'beginner' | 'intermediate' | 'advanced';

export interface IWorkout extends Document {
  name: string;
  description: string;
  difficulty: WorkoutDifficulty;
  durationMinutes: number;
  exercises: string[];
}

const workoutSchema: Schema<IWorkout> = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'beginner',
  },
  durationMinutes: { type: Number, required: true },
  exercises: [{ type: String }],
});

const Workout = model('Workout', workoutSchema) as Model<IWorkout>;

export default Workout;
