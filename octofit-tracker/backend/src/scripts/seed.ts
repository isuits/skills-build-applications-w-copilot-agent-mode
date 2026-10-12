import mongoose from 'mongoose';
import { connectDB } from '../config/database';
import Activity from '../models/Activity';
import Leaderboard from '../models/Leaderboard';
import Team from '../models/Team';
import User from '../models/User';
import Workout from '../models/Workout';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await connectDB();

    console.log('Clearing existing collections...');
    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    console.log('Creating users...');
    const users = await User.insertMany([
      { name: 'Alex Johnson', email: 'alex.johnson@octofit.com', age: 28 },
      { name: 'Priya Patel', email: 'priya.patel@octofit.com', age: 34 },
      { name: 'Marcus Chen', email: 'marcus.chen@octofit.com', age: 22 },
      { name: 'Sofia Rodriguez', email: 'sofia.rodriguez@octofit.com', age: 29 },
      { name: "Liam O'Brien", email: 'liam.obrien@octofit.com', age: 41 },
      { name: 'Emma Wilson', email: 'emma.wilson@octofit.com', age: 25 },
      { name: 'Noah Kim', email: 'noah.kim@octofit.com', age: 31 },
      { name: 'Ava Martinez', email: 'ava.martinez@octofit.com', age: 27 },
    ]);
    const [alex, priya, marcus, sofia, liam, emma, noah, ava] = users;

    console.log('Creating teams...');
    const [thunderbolts, phoenixFlyers] = await Team.insertMany([
      { name: 'Thunderbolts', members: [alex._id, priya._id, marcus._id, sofia._id] },
      { name: 'Phoenix Flyers', members: [liam._id, emma._id, noah._id, ava._id] },
    ]);

    console.log('Linking users to teams...');
    await Promise.all([
      User.updateMany({ _id: { $in: thunderbolts.members } }, { team: thunderbolts._id }),
      User.updateMany({ _id: { $in: phoenixFlyers.members } }, { team: phoenixFlyers._id }),
    ]);

    console.log('Creating activities...');
    await Activity.insertMany([
      { user: alex._id, type: 'running', durationMinutes: 35, caloriesBurned: 310, date: new Date('2026-09-28') },
      { user: alex._id, type: 'strength', durationMinutes: 50, caloriesBurned: 280, date: new Date('2026-10-02') },
      { user: priya._id, type: 'yoga', durationMinutes: 45, caloriesBurned: 150, date: new Date('2026-09-29') },
      { user: priya._id, type: 'cycling', durationMinutes: 60, caloriesBurned: 420, date: new Date('2026-10-04') },
      { user: marcus._id, type: 'swimming', durationMinutes: 40, caloriesBurned: 360, date: new Date('2026-09-30') },
      { user: marcus._id, type: 'running', durationMinutes: 25, caloriesBurned: 220, date: new Date('2026-10-05') },
      { user: sofia._id, type: 'walking', durationMinutes: 30, caloriesBurned: 120, date: new Date('2026-10-01') },
      { user: sofia._id, type: 'strength', durationMinutes: 55, caloriesBurned: 300, date: new Date('2026-10-06') },
      { user: liam._id, type: 'cycling', durationMinutes: 75, caloriesBurned: 500, date: new Date('2026-09-27') },
      { user: liam._id, type: 'yoga', durationMinutes: 30, caloriesBurned: 110, date: new Date('2026-10-03') },
      { user: emma._id, type: 'running', durationMinutes: 40, caloriesBurned: 340, date: new Date('2026-09-26') },
      { user: emma._id, type: 'strength', durationMinutes: 45, caloriesBurned: 260, date: new Date('2026-10-07') },
      { user: noah._id, type: 'swimming', durationMinutes: 50, caloriesBurned: 410, date: new Date('2026-09-25') },
      { user: noah._id, type: 'walking', durationMinutes: 35, caloriesBurned: 140, date: new Date('2026-10-08') },
      { user: ava._id, type: 'cycling', durationMinutes: 65, caloriesBurned: 430, date: new Date('2026-09-24') },
      { user: ava._id, type: 'yoga', durationMinutes: 25, caloriesBurned: 100, date: new Date('2026-10-09') },
    ]);

    console.log('Creating leaderboard entries...');
    await Leaderboard.insertMany([
      { user: alex._id, team: thunderbolts._id, points: 820 },
      { user: priya._id, team: thunderbolts._id, points: 910 },
      { user: marcus._id, team: thunderbolts._id, points: 760 },
      { user: sofia._id, team: thunderbolts._id, points: 690 },
      { user: liam._id, team: phoenixFlyers._id, points: 980 },
      { user: emma._id, team: phoenixFlyers._id, points: 845 },
      { user: noah._id, team: phoenixFlyers._id, points: 770 },
      { user: ava._id, team: phoenixFlyers._id, points: 715 },
    ]);

    console.log('Creating workout suggestions...');
    await Workout.insertMany([
      {
        name: 'Morning Cardio Blast',
        description: 'A quick high-energy cardio session to kickstart your day.',
        difficulty: 'beginner',
        durationMinutes: 30,
        exercises: ['Jumping jacks', 'High knees', 'Burpees', 'Mountain climbers'],
      },
      {
        name: 'Full Body Strength',
        description: 'Build strength across major muscle groups with compound movements.',
        difficulty: 'intermediate',
        durationMinutes: 45,
        exercises: ['Squats', 'Push-ups', 'Deadlifts', 'Lunges', 'Plank'],
      },
      {
        name: 'Yoga Flow for Recovery',
        description: "A gentle flow to improve flexibility and aid muscle recovery.",
        difficulty: 'beginner',
        durationMinutes: 20,
        exercises: ["Child's pose", 'Downward dog', 'Warrior I', 'Cat-cow'],
      },
      {
        name: 'HIIT Power Circuit',
        description: 'An intense interval circuit to maximize calorie burn.',
        difficulty: 'advanced',
        durationMinutes: 40,
        exercises: ['Burpees', 'Box jumps', 'Kettlebell swings', 'Sprints'],
      },
      {
        name: 'Endurance Cycling Challenge',
        description: 'A long-distance ride mixing steady pace with hill climbs.',
        difficulty: 'intermediate',
        durationMinutes: 60,
        exercises: ['Steady-state ride', 'Interval sprints', 'Hill climbs'],
      },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
