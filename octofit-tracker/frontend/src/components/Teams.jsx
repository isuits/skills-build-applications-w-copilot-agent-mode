import { useEffect, useState } from 'react';
import { API_BASE_URL } from '../config/api';
import { extractItems } from '../utils/apiResponse';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    fetch(`${API_BASE_URL}/api/teams/`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch teams (${response.status})`);
        }
        return response.json();
      })
      .then((data) => {
        if (isMounted) {
          setTeams(extractItems(data));
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
    return <p>Loading teams...</p>;
  }

  if (error) {
    return <p className="text-danger">Error loading teams: {error}</p>;
  }

  return (
    <div className="container mt-4">
      <h2>Teams</h2>
      {teams.map((team) => (
        <div className="card mb-3" key={team._id ?? team.id}>
          <div className="card-body">
            <h5 className="card-title">{team.name}</h5>
            <ul className="list-group list-group-flush">
              {(team.members ?? []).map((member) => (
                <li className="list-group-item" key={member._id ?? member.id}>
                  {member.name} ({member.email})
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Teams;
