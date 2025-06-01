import type { User } from '../types/User'
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const UserForm = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [formData, setFormData] = useState<User>({
    id: '',
    firstName: '',
    lastName: '',
    age: 0,
    bio: '',
    img: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const fetchUser = async () => {
    try {
      const response = await axios.get<User>(`https://645403e2c18adbbdfeada66e.mockapi.io/users/${id}`)
      const data = response.data
      setFormData(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch user')
    }
  }
  
  useEffect(() => {
    if (id) {
      fetchUser()
    }
  }, [id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const url = id 
        ? `https://645403e2c18adbbdfeada66e.mockapi.io/users/${id}`
        : 'https://645403e2c18adbbdfeada66e.mockapi.io/users'

      const method = id ? 'PUT' : 'POST'
      
      const response = await axios({
        method,
        url,
        headers: {
          'Content-Type': 'application/json',
        },
        data: formData,
      })
      console.log(response)

      navigate('/')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <div>
      <h2>{formData.id ? 'Edit User' : 'Create User'}</h2>
      <form onSubmit={handleSubmit} className='edit-create-form'>
        <div>
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="age">Age:</label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="bio">Bio:</label>
          <textarea
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            rows={4}
          />
        </div>
        <div>
          <label htmlFor="img">Image URL:</label>
          <input
            type="url"
            id="img"
            name="img"
            value={formData.img}
            onChange={handleChange}
            required
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Create User'}
        </button>
      </form>
    </div>
  )
}

export default UserForm
