import type { User } from '../types/User'

type Props = {
  user: User | null
}

export function UserDetails({ user }: Props) {
  if (!user) return <p>Select a user to see details.</p>

  return (
    <div style={{ border: '1px solid #ccc', padding: '1rem' }}>
      <h2>{user.name}</h2>
      <img src={user.avatar} alt={user.name} width={64} height={64} style={{ borderRadius: '50%' }} />
      <p>Email: {user.email}</p>
    </div>
  )
}
