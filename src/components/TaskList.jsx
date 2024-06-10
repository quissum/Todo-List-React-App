import { List } from '@mui/material'
import TaskItem from './TaskItem'

export default function TaskList({
  tasks,
  deleteTask,
  updateTask,
  toggleTaskCompletion,
  focusedTextareaRef,
}) {
  return (
    <List>
      {tasks.map(task => (
        <TaskItem
          key={task.key}
          task={task}
          deleteTask={deleteTask}
          updateTask={updateTask}
          toggleTaskCompletion={toggleTaskCompletion}
          focusedTextareaRef={focusedTextareaRef}
        />
      ))}
    </List>
  )
}
