import { useEffect, useState } from 'react';
import { API_BASE_URL } from '../config/api';
import { extractItems } from '../utils/apiResponse';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    fetch(`${API_BASE_URL}/api/workouts/`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch workouts (${response.status})`);
        }
        return response.json();
      })
      .then((data) => {
        if (isMounted) {
          setWorkouts(extractItems(data));
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
    return <p>Loading workouts...</p>;
  }

  if (error) {
    return <p className="text-danger">Error loading workouts: {error}</p>;
  }

  return (
    <div className="container mt-4">
      <h2>Workout Suggestions</h2>
      <div className="row">
        {workouts.map((workout) => (
          <div className="col-md-6 mb-3" key={workout._id ?? workout.id}>
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{workout.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted text-capitalize">
                  {workout.difficulty} · {workout.durationMinutes} min
                </h6>
                <p className="card-text">{workout.description}</p>
                <ul>
                  {(workout.exercises ?? []).map((exercise) => (
                    <li key={exercise}>{exercise}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Workouts;
