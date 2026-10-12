import 'dotenv/config';
import app from './app';
import { connectDB } from './config/database';

const PORT = Number(process.env.PORT || 8000);

/**
 * Resolve the public API base URL. In GitHub Codespaces, forwarded ports are
 * reachable at `https://${CODESPACE_NAME}-8000.app.github.dev` instead of
 * `localhost`.
 */
const baseUrl = process.env.CODESPACE_NAME
  ? `https://${process.env.CODESPACE_NAME}-8000.app.github.dev`
  : 'http://localhost:8000';

async function start(): Promise<void> {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Octofit Tracker API listening on port ${PORT}`);
    console.log(`API base URL: ${baseUrl}`);
  });
}

start();

export { baseUrl };
