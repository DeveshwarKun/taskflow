import { useState } from 'react'

const statuses = ['To Do', 'In Progress', 'In Review', 'Completed']

export default function Board({ tasks, setTasks }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState('Medium')
  const [dueDate, setDueDate] = useState('')

  function addTask(e) {
    e.preventDefault()

    const newTask = {
      id: crypto.randomUUID(),
      title: title,
      description: description,
      priority: priority,
      dueDate: dueDate,
      status: 'To Do'
    }

    setTasks([...tasks, newTask])

    setTitle('')
    setDescription('')
    setPriority('Medium')
    setDueDate('')
  }
  function deleteTask(id) {
  if (window.confirm('Delete this task?')) {
    setTasks(tasks.filter(t => t.id !== id))
  }
}

function moveTask(id, status) {
  setTasks(tasks.map(t =>
    t.id === id ? { ...t, status: status } : t
  ))
}

function editTask(task) {
  const title = prompt('Task title:', task.title)
  if (!title?.trim()) return

  const description = prompt('Description:', task.description)
  if (description === null) return

  const priority = prompt('Priority (Low, Medium, High):', task.priority)
  if (!['Low', 'Medium', 'High'].includes(priority)) return

  const dueDate = prompt('Due date (YYYY-MM-DD):', task.dueDate)
  if (!dueDate || !/^\d{4}-\d{2}-\d{2}$/.test(dueDate)) return

  setTasks(tasks.map(t =>
    t.id === task.id
      ? { ...t, title, description, priority, dueDate }
      : t
  ))
}

  return (
    <div>
      <h2>Kanban Board</h2>

      <form className="task-form" onSubmit={addTask}>
        <input
          placeholder="Task title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />

        <select
          value={priority}
          onChange={e => setPriority(e.target.value)}
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>

        <input
          type="date"
          value={dueDate}
          onChange={e => setDueDate(e.target.value)}
          required
        />

        <button type="submit">Add Task</button>
      </form>

      <div className="kanban">
        {statuses.map(status => (
          <div className="column" key={status}>
            <h3>
              {status} ({tasks.filter(t => t.status === status).length})
            </h3>

            {tasks.filter(t => t.status === status).map(task => (
              <div className="task-card" key={task.id}>
                <h4>{task.title}</h4>
                <p>{task.description}</p>
                <p>Priority: {task.priority}</p>
                <p>Due: {task.dueDate}</p>
                <select
  value={task.status}
  onChange={e => moveTask(task.id, e.target.value)}
>
  {statuses.map(s => (
    <option key={s}>{s}</option>
  ))}
</select>

<button onClick={() => editTask(task)}>Edit</button>

<button onClick={() => deleteTask(task.id)}>Delete</button>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}