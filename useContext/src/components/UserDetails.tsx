import type { User } from '../types/User'
import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'

const UserDetails = () => {
    const [user, setUser] = useState<User | null>(null)
    const { id } = useParams()

    useEffect(() => {
        const getUser = async () => {
            try {
                const response = await axios.get<User>(`https://645403e2c18adbbdfeada66e.mockapi.io/users/${id}`)
                const data = response.data
                setUser(data)
            } catch (error) {
            console.error(error)
            }
        }
        getUser()
    }, [])

    if (!user) {
        return <div>Loading...</div>
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
