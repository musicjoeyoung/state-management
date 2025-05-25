import type { User } from '../types/User'
import { useState, useEffect } from 'react'
import axios from 'axios'

const UserStats = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    averageAge: 0,
    oldestUser: null as User | null,
    youngestUser: null as User | null,
    loading: true,
    error: null as string | null
  })

  const fetchStats = async () => {
    try {
      const response = await axios.get<User[]>('https://645403e2c18adbbdfeada66e.mockapi.io/users')
      const users = response.data

      if (!Array.isArray(users)) {
        throw new Error('Invalid response format')
      }

      const totalUsers = users.length
      const averageAge = users.reduce((sum, user) => sum + user.age, 0) / totalUsers
      const oldestUser = users.reduce((oldest, user) => 
        user.age > (oldest?.age || 0) ? user : oldest, null as User | null
      )
      const youngestUser = users.reduce((youngest, user) => 
        user.age < (youngest?.age || Infinity) ? user : youngest, null as User | null
      )

      setStats({
        totalUsers,
        averageAge,
        oldestUser,
        youngestUser,
        loading: false,
        error: null
      })
    } catch (err) {
      setStats(prev => ({
        ...prev,
        loading: false,
        error: err instanceof Error ? err.message : 'Failed to fetch stats'
      }))
    }
  }

  useEffect(() => {
    fetchStats()
  }, [])

  if (stats.loading) {
    return <div>Loading stats...</div>
  }

  if (stats.error) {
    return <div className="error">{stats.error}</div>
  }

  return (
    <div>
      <h2>User Statistics</h2>
      <p>Total Users: {stats.totalUsers}</p>
      <p>Average Age: {stats.averageAge.toFixed(1)}</p>
      <div>
        <h3>Oldest User</h3>
        {stats.oldestUser && (
          <div>
            <p>{stats.oldestUser.firstName} {stats.oldestUser.lastName}</p>
            <p>Age: {stats.oldestUser.age}</p>
          </div>
        )}
      </div>
      <div>
        <h3>Youngest User</h3>
        {stats.youngestUser && (
          <div>
            <p>{stats.youngestUser.firstName} {stats.youngestUser.lastName}</p>
            <p>Age: {stats.youngestUser.age}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default UserStats
