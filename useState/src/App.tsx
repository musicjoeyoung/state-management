import './App.css'

import { BrowserRouter, Route, Routes } from 'react-router-dom'

import AllTasksPage from './pages/AllTasksPage'
import CompletedPage from './pages/CompletedPage'
import Header from './components/layout/Header'
import ProjectPage from './pages/ProjectPage'
import Sidebar from './components/layout/Sidebar'
import TagPage from './pages/TagPage'

function App() {


  return (
    <BrowserRouter>
      <Header />
      <Sidebar />
      <Routes>
        <Route path="/" element={<AllTasksPage />} />
        <Route path="/projects/:id" element={<ProjectPage />} />
        <Route path="/tags/:id" element={<TagPage />} />
        <Route path="/completed" element={<CompletedPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
