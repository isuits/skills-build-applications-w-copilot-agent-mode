/**
 * Resolves the Octofit Tracker API base URL for both GitHub Codespaces and
 * local development.
 *
 * `VITE_CODESPACE_NAME` must be defined for Codespaces-hosted development
 * (for example in a `.env.local` file; see `.env.local.example`). When it is
 * unset, requests safely fall back to `http://localhost:8000`.
 */
const codespaceName = import.meta.env.VITE_CODESPACE_NAME;

export const API_BASE_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';
