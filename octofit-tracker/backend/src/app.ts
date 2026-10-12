import cors from 'cors';
import express, { Express, Request, Response } from 'express';

const app: Express = express();

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok' });
});

export default app;
