/**
 * Codespaces-aware base URL helpers.
 *
 * In GitHub Codespaces, forwarded ports are reachable at
 * `https://${CODESPACE_NAME}-${port}.app.github.dev` instead of `localhost`.
 */

export function getApiBaseUrl(): string {
  const codespaceName = process.env.CODESPACE_NAME;
  return codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';
}

export function getFrontendBaseUrl(): string {
  const codespaceName = process.env.CODESPACE_NAME;
  return codespaceName
    ? `https://${codespaceName}-5173.app.github.dev`
    : 'http://localhost:5173';
}
