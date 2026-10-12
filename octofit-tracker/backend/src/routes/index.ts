import { Router } from 'express';
import activitiesRouter from './activities';
import leaderboardRouter from './leaderboard';
import teamsRouter from './teams';
import usersRouter from './users';
import workoutsRouter from './workouts';

const router = Router();

router.use('/api/users', usersRouter);
router.use('/api/teams', teamsRouter);
router.use('/api/activities', activitiesRouter);
router.use('/api/leaderboard', leaderboardRouter);
router.use('/api/workouts', workoutsRouter);

export default router;
