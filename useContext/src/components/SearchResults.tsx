import { useSearchParams } from 'react-router-dom';
import { useUsers } from '../context/UserContext';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const { users, loading, error } = useUsers();

  const name = searchParams.get('name') || '';
  const minAge = parseInt(searchParams.get('minAge') || '0');
  const maxAge = parseInt(searchParams.get('maxAge') || '100');

  if (loading) {
    return <div>Loading search results...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  const results = users.filter(user => {
    const matchesName = user.firstName.toLowerCase().includes(name.toLowerCase()) || 
                      user.lastName.toLowerCase().includes(name.toLowerCase())
    const matchesAge = user.age >= minAge && user.age <= maxAge
    return matchesName && matchesAge
  })

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
