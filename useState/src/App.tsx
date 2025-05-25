import { BrowserRouter, Routes, Route } from 'react-router-dom'
import UserList from './components/UserList'
import UserDetails from './components/UserDetails'
import UserForm from './components/UserForm'
import UserStats from './components/UserStats'
import UserSearch from './components/UserSearch'
import SearchResults from './components/SearchResults'
import Navbar from './components/Navbar'

const App = () => {
  return (
    <BrowserRouter>
        <Navbar />
        <UserStats />
        <UserSearch />
        <Routes>
          <Route path="/" element={<UserList />} />
          <Route path="/users/:id" element={<UserDetails />} />
          <Route path="/create" element={<UserForm />} />
          <Route path="/edit/:id" element={<UserForm />} />
          <Route path="/search" element={<SearchResults />} />
        </Routes>
    </BrowserRouter>
  )
}
export default App