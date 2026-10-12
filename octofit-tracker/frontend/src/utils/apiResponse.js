/**
 * Normalizes an API response body into an array of items.
 *
 * Supports both plain array responses (e.g. `[{...}, {...}]`) and paginated
 * object responses (e.g. `{ results: [...], count, next, previous }` or
 * `{ items: [...] }`), so components work regardless of API response shape.
 */
export function extractItems(data) {
  if (Array.isArray(data)) {
    return data;
  }
  if (data && Array.isArray(data.results)) {
    return data.results;
  }
  if (data && Array.isArray(data.items)) {
    return data.items;
  }
  return [];
}
