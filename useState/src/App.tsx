import { BrowserRouter, Routes, Route} from 'react-router-dom'
import UserDetails from './components/UserDetails'
import UserList from './components/UserList'

const App = () => {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserList />} />
      </Routes>
      <Routes>
        <Route path="/users/:id" element={<UserDetails />} />
      </Routes>
    </BrowserRouter>
  )
}
 export default App