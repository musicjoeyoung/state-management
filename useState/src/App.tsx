import { useEffect, useState } from 'react'
import type { User } from './types/User'
import { UserList } from './components/UserList'
import { UserDetails } from './components/UserDetails'
import axios from "axios"

export default function App() {
  const [users, setUsers] = useState<User[]>([])
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const getData = async() => {
    try{
      const response = await axios.get<User[]>('https://645403e2c18adbbdfeada66e.mockapi.io/users')
      setUsers(response.data)
      setLoading(false)
    }catch(error: unknown){
      console.log(error)
      setError(error instanceof Error ? error.message : 'An unknown error occurred')
      setLoading(false)
    }
  }

  useEffect(() => {
    getData()
}, [])

  return (
    <div style={{ display: 'flex', gap: '2rem', padding: '1rem' }}>
      <div style={{ flex: 1 }}>
        <h1>User List</h1>
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {!loading && !error && <UserList users={users} onSelect={setSelectedUser} />}
      </div>
      <div style={{ flex: 1 }}>
        <h1>User Details</h1>
        <UserDetails user={selectedUser} />
      </div>
    </div>
  )
}
