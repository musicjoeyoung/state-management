import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import type { User } from '../types/User'

const SearchResults = () => {
  const [searchParams] = useSearchParams()
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await fetch('https://645403e2c18adbbdfeada66e.mockapi.io/users')
        if (!response.ok) throw new Error('Failed to fetch users')
        const data = await response.json()
        setUsers(data)
      } catch (err) {
        setError('Failed to load users')
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  const name = searchParams.get('name') || ''
  const minAge = parseInt(searchParams.get('minAge') || '0')
  const maxAge = parseInt(searchParams.get('maxAge') || '100')

  const results = users.filter(user => {
    const matchesName = user.firstName.toLowerCase().includes(name.toLowerCase()) || 
                      user.lastName.toLowerCase().includes(name.toLowerCase())
    const matchesAge = user.age >= minAge && user.age <= maxAge
    return matchesName && matchesAge
  })

  if (loading) return <div>Loading...</div>
  if (error) return <div className="error">{error}</div>
  if (results.length === 0) return <div>No results found</div>

  return (
    <div>
      <h2>Search Results</h2>
      <div>
        {results.map(user => (
          <div key={user.id}>
            <h3>{user.firstName} {user.lastName}</h3>
            <p>Age: {user.age}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SearchResults
