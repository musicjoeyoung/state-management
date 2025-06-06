import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import type { User } from './types/User'
import UserList from './components/UserList'
import UserDetails from './components/UserDetails'
import UserForm from './components/UserForm'
import UserStats from './components/UserStats'
import UserSearch from './components/UserSearch'
import SearchResults from './components/SearchResults'
import Navbar from './components/Navbar'

const App = () => {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchUsers = async () => {
    try {
      const response = await axios.get<User[]>('https://645403e2c18adbbdfeada66e.mockapi.io/users')
      setUsers(response.data)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching users:', error)
      setError(error instanceof Error ? error.message : 'An unknown error occurred')
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <BrowserRouter>
      <Navbar />
      <UserStats users={users} />
      <UserSearch />
      <Routes>
        <Route path="/" element={<UserList users={users} />} />
        <Route path="/users/:id" element={<UserDetails users={users} />} />
        <Route path="/create" element={<UserForm onUserAdded={fetchUsers} />} />
        <Route path="/edit/:id" element={<UserForm onUserAdded={fetchUsers} />} />
        <Route path="/search" element={<SearchResults users={users} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App