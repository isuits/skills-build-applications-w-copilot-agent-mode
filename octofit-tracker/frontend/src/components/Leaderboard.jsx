import { useEffect, useState } from 'react';
import { API_BASE_URL } from '../config/api';
import { extractItems } from '../utils/apiResponse';

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    fetch(`${API_BASE_URL}/api/leaderboard/`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch leaderboard (${response.status})`);
        }
        return response.json();
      })
      .then((data) => {
        if (isMounted) {
          setEntries(extractItems(data));
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message);
        }
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return <p>Loading leaderboard...</p>;
  }

  if (error) {
    return <p className="text-danger">Error loading leaderboard: {error}</p>;
  }

  return (
    <div className="container mt-4">
      <h2>Leaderboard</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Rank</th>
            <th>User</th>
            <th>Team</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry, index) => (
            <tr key={entry._id ?? entry.id}>
              <td>{index + 1}</td>
              <td>{entry.user?.name ?? '—'}</td>
              <td>{entry.team?.name ?? '—'}</td>
              <td>{entry.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Leaderboard;
