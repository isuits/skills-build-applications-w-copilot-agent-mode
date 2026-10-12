import { useEffect, useState } from 'react';
import { API_BASE_URL } from '../config/api';
import { extractItems } from '../utils/apiResponse';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    fetch(`${API_BASE_URL}/api/users/`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch users (${response.status})`);
        }
        return response.json();
      })
      .then((data) => {
        if (isMounted) {
          setUsers(extractItems(data));
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
    return <p>Loading users...</p>;
  }

  if (error) {
    return <p className="text-danger">Error loading users: {error}</p>;
  }

  return (
    <div className="container mt-4">
      <h2>Users</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Age</th>
            <th>Team</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id ?? user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.age ?? '—'}</td>
              <td>{user.team?.name ?? '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Users;
