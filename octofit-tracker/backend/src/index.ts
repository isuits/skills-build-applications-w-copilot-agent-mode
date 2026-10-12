import 'dotenv/config';
import app from './app';
import { connectDB } from './config/database';
import { getApiBaseUrl } from './config/env';

const PORT = process.env.PORT || 8000;

async function start(): Promise<void> {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Octofit Tracker API listening on port ${PORT}`);
    console.log(`API base URL: ${getApiBaseUrl()}`);
  });
}

start();
