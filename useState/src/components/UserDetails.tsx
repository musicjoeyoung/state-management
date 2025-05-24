import type { User } from '../types/User'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'



const UserDetails = () => {
    const [user, setUser] = useState<User | null>(null)
    const { id } = useParams()

    useEffect(() => {
        const getUser = async () => {
            try {
                const response = await fetch(`https://645403e2c18adbbdfeada66e.mockapi.io/users/${id}`)
                const data = await response.json()
                setUser(data)
            } catch (error) {
                console.error(error)
            }
        }
        getUser()
    }, [id])

  return (
    <div style={{ border: '1px solid #ccc', padding: '1rem' }}>
      <h2>{user?.firstName} {user?.lastName}</h2>
      <img src={user?.img} alt={user?.firstName} width={64} height={64} style={{ borderRadius: '50%' }} />
      <p>{user?.bio}</p>
    </div>
  )
}

export default UserDetails
