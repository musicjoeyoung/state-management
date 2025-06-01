import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const UserSearch = () => {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [ageRange, setAgeRange] = useState<[number, number]>([0, 100])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    navigate(`/search?name=${encodeURIComponent(searchTerm)}&minAge=${ageRange[0]}&maxAge=${ageRange[1]}`)
  }

  return (
    <form onSubmit={handleSearch}>
      <input
        type="text"
        placeholder="Search by name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div>
        <input
          type="number"
          placeholder="Min Age"
          value={ageRange[0]}
          onChange={(e) => setAgeRange([parseInt(e.target.value) || 0, ageRange[1]])}
        />
        <input
          type="number"
          placeholder="Max Age"
          value={ageRange[1]}
          onChange={(e) => setAgeRange([ageRange[0], parseInt(e.target.value) || 100])}
        />
      </div>
      <button type="submit">Search</button>
    </form>
  )
}

export default UserSearch
