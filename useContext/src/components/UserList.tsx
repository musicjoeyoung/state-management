import type { User } from '../types/User'
import { Link } from 'react-router-dom'

interface UserListProps {
  users: User[]
}

const UserList = ({ users }: UserListProps) => {

  return (
    <ul>
      {users.map(user => (
        <Link to={`/users/${user.id}`} key={user.id}>
          <li>
            <img src={user.img} alt={user.firstName} width={32} height={32} style={{ borderRadius: '50%', marginRight: 8 }} />
            {user.firstName} {user.lastName}
          </li>
        </Link>
      ))}
    </ul>
  )
}

export default UserList
