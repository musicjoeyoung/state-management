import type { User } from '../types/User'

interface UserStatsProps {
  users: User[]
}

const UserStats = ({ users }: UserStatsProps) => {
  if (users.length === 0) {
    return <div>No users available</div>
  }

  const totalUsers = users.length
  const averageAge = users.reduce((sum, user) => {
    const age = Number(user.age);
    if (isNaN(age)) {
      console.warn(`Invalid age for user ${user.id}:`, user.age);
      return sum;
    }
    return sum + age;
  }, 0) / totalUsers;
  
  const oldestUser = users.reduce((oldest, user) =>
    user.age > (oldest?.age || 0) ? user : oldest, null as User | null
  )
  
  const youngestUser = users.reduce((youngest, user) =>
    user.age < (youngest?.age || Infinity) ? user : youngest, null as User | null
  )

  return (
    <div>
      <h2>User Statistics</h2>
      <p>Total Users: {totalUsers}</p>
      <p>Average Age: {averageAge.toFixed(1)}</p>
      <div>
        <h3>Oldest User</h3>
        {oldestUser && (
          <div>
            <p>{oldestUser.firstName} {oldestUser.lastName}</p>
            <p>Age: {oldestUser.age}</p>
          </div>
        )}
      </div>
      <div>
        <h3>Youngest User</h3>
        {youngestUser && (
          <div>
            <p>{youngestUser.firstName} {youngestUser.lastName}</p>
            <p>Age: {youngestUser.age}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default UserStats
