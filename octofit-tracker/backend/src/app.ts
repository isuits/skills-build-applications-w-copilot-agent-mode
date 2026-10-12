import cors from 'cors';
import express, { Express, Request, Response } from 'express';
import { getApiBaseUrl, getFrontendBaseUrl } from './config/env';
import apiRouter from './routes';

const app: Express = express();

app.use(cors({ origin: getFrontendBaseUrl() }));
app.use(express.json());

app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok' });
});

app.get('/api', (_req: Request, res: Response) => {
  res.json({
    message: 'Octofit Tracker API',
    baseUrl: getApiBaseUrl(),
    endpoints: ['/api/users', '/api/teams', '/api/activities', '/api/leaderboard', '/api/workouts'],
  });
});

app.use('/api', apiRouter);

export default app;
