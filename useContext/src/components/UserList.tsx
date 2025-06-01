import type { User } from '../types/User'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useEffect, useState } from 'react'

const UserList = () => {
    const [users, setUsers] = useState<User[]>([])
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
  
  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

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
