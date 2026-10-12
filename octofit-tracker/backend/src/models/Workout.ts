import { Document, Schema, model } from 'mongoose';

export type WorkoutDifficulty = 'beginner' | 'intermediate' | 'advanced';

export interface IWorkout extends Document {
  name: string;
  description: string;
  difficulty: WorkoutDifficulty;
  durationMinutes: number;
  exercises: string[];
}

const workoutSchema = new Schema<IWorkout>({
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

export default model<IWorkout>('Workout', workoutSchema);
