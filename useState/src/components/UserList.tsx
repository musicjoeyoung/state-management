import type { User } from '../types/User'

type Props = {
  users: User[]
  onSelect: (user: User) => void
}

export function UserList({ users, onSelect }: Props) {
  return (
    <ul>
      {users.map(user => (
        <li key={user.id} onClick={() => onSelect(user)} style={{ cursor: 'pointer', marginBottom: '0.5rem' }}>
          <img src={user.avatar} alt={user.name} width={32} height={32} style={{ borderRadius: '50%', marginRight: 8 }} />
          {user.name}
        </li>
      ))}
    </ul>
  )
}
