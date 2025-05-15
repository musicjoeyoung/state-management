import './App.css'

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import type { Project, Tag, Task } from './types/types'

import AllTasksPage from './pages/AllTasksPage'
import CompletedPage from './pages/CompletedPage'
import Header from './components/layout/Header'
import ProjectPage from './pages/ProjectPage'
import Sidebar from './components/layout/Sidebar'
import StateDebugger from './components/debug/StateDebugger'
import TagPage from './pages/TagPage'
import TaskFormModal from './components/tasks/TaskFormModal'
import { useState } from 'react'

function App() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [tags, setTags] = useState<Tag[]>([])
  const [filters, setFilters] = useState({ projectId: null, tagId: null, completedOnly: false })


  return (
    <BrowserRouter>
      <Header />
      <Sidebar
        projects={projects}
        tags={tags}
        filters={filters}
        setFilters={setFilters} />
      <Routes>
        <Route path="/" element={<AllTasksPage tasks={tasks} filters={filters} />} />
        <Route path="/projects/:id" element={<ProjectPage tasks={tasks} />} />
        <Route path="/tags/:id" element={<TagPage tasks={tasks} />} />
        <Route path="/completed" element={<CompletedPage tasks={tasks} />} />
      </Routes>
      <TaskFormModal onAddTask={(newTask) => {
        setTasks([...tasks, newTask])
      }
      } projects={projects}
        tags={tags} />
      <StateDebugger state={{ tasks, projects, tags, filters }} />
    </BrowserRouter>
  )
}

export default App
