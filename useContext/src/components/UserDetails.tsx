import type { User } from '../types/User'
import { useParams, Link } from 'react-router-dom'

interface UserDetailsProps {
  users: User[]
}

const UserDetails = ({ users }: UserDetailsProps) => {
  const { id } = useParams()
  const user = users.find(user => user.id === id)

  if (!user) {
    return <div>User not found</div>
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
