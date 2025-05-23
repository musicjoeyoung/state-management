import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Users from './pages/Users'
import UserDetails from './components/UserDetails'

const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Users />} />
      </Routes>
      <Routes>
        <Route path="/users/:id" element={<UserDetails user={null} />} />
      </Routes>
    </BrowserRouter>
  )
}
 export default App