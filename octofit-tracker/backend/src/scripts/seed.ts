import mongoose from 'mongoose';
import { connectDB } from '../config/database';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await connectDB();

    // TODO: Add seed data for users, teams, activities, leaderboard, and workouts

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
