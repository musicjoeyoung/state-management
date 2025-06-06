import { useParams, Link } from 'react-router-dom';
import { useUsers } from '../context/UserContext';

const UserDetails = () => {
  const { id } = useParams();
  const { users, loading, error } = useUsers();
  const user = users.find(user => user.id === id);

  if (loading) {
    return <div>Loading user details...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div>
      <h2>{user.firstName} {user.lastName}</h2>
      <img src={user.img} alt={user.firstName} width={64} height={64} />
      <p>Bio: {user.bio}</p>
      <p>Age: {user.age}</p>
      <Link to={`/edit/${user.id}`}>Edit</Link>
    </div>
  )
}

export default UserDetails
