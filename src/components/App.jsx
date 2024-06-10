import { Container } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import AddTaskButton from './AddTaskButton'
import TaskList from './TaskList'

const initialTasks = JSON.parse(localStorage.getItem('tasks')) || []

export default function App() {
  const [tasks, setTasks] = useState(initialTasks)
  const focusedTextareaRef = useRef(null) // Ref to manage focus on the new task
  let copiedTasks = JSON.parse(JSON.stringify(tasks)) // Deep copy of tasks to avoid direct mutation

  // Effect to focus on the textarea of the new task
  useEffect(() => {
    if (focusedTextareaRef.current) {
      focusedTextareaRef.current.focus()
    }
  }, [tasks])

  const saveTasks = updatedTasks => {
    setTasks(updatedTasks)
    localStorage.setItem('tasks', JSON.stringify(updatedTasks))
  }

  const updateTask = (taskKey, value) => {
    const updatedTasks = copiedTasks.map(task => {
      if (task.key === taskKey) {
        task.value = value
      }
      return task
    })
    saveTasks(updatedTasks)
  }

  const toggleTaskCompletion = task => {
    const completedTaskIndex = copiedTasks.findIndex(t => t.completed)
    const updatedTask = { ...task, completed: !task.completed }
    const updatedTasks = copiedTasks.filter(t => t.key !== task.key)

    if (
      updatedTask.completed ||
      (!updatedTask.completed && completedTaskIndex === -1)
    ) {
      updatedTasks.push(updatedTask)
    } else {
      updatedTasks.splice(completedTaskIndex, 0, updatedTask)
    }

    saveTasks(updatedTasks)
  }

  const deleteTask = taskKey => {
    const updatedTasks = copiedTasks.filter(task => task.key !== taskKey)
    saveTasks(updatedTasks)
  }

  const addTask = () => {
    if (copiedTasks.find(task => !task.value)) {
      focusedTextareaRef.current.focus()
      return
    }

    const newTask = {
      key: uuidv4(),
      value: '',
      completed: false,
    }
    const firstCompletedTaskIndex = copiedTasks.findIndex(
      task => task.completed
    )

    // Insert new task before the first completed task, or at the end if no completed tasks
    if (firstCompletedTaskIndex === -1) {
      copiedTasks.push(newTask)
    } else {
      copiedTasks.splice(firstCompletedTaskIndex, 0, newTask)
    }
    setTasks(copiedTasks)
  }

  return (
    <>
      <Container sx={{ maxWidth: '400px' }}>
        <TaskList
          tasks={copiedTasks}
          deleteTask={deleteTask}
          updateTask={updateTask}
          toggleTaskCompletion={toggleTaskCompletion}
          focusedTextareaRef={focusedTextareaRef}
        />
        <AddTaskButton addTask={addTask} />
      </Container>
    </>
  )
}
