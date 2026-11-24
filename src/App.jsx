import { useState, useEffect } from 'react'
import Dashboard from './pages/Dashboard'
import Board from './pages/Board'
import Calendar from './pages/Calendar'
import Settings from './pages/Settings'
import './App.css'

function App() {
  const [page, setPage] = useState('Dashboard')
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('tasks')
    return saved ? JSON.parse(saved) : []
  })
  useEffect(() => {
  localStorage.setItem('tasks', JSON.stringify(tasks))
}, [tasks])

  return (
    <div>
      <nav>
        <h1>TaskFlow</h1>
        {['Dashboard', 'Board', 'Calendar', 'Settings'].map(name => (
          <button key={name} onClick={() => setPage(name)}>
            {name}
          </button>
        ))}
      </nav>

      <main>
        {page === 'Dashboard' && <Dashboard />}
        {page === 'Board' && <Board tasks={tasks} setTasks={setTasks} />}
        {page === 'Calendar' && <Calendar />}
        {page === 'Settings' && <Settings />}
      </main>
    </div>
  )
}

export default App