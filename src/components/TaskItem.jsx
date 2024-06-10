import { Checkbox, IconButton, ListItem, TextareaAutosize } from '@mui/material'
import { RemoveCircleOutlineOutlined } from '@mui/icons-material'
import styles from './App.module.scss'

export default function TaskItem({
  task,
  deleteTask,
  updateTask,
  toggleTaskCompletion,
  focusedTextareaRef,
}) {
  const handleTextChange = e => {
    updateTask(task.key, e.target.value)
  }

  const handleCheckboxChange = () => {
    toggleTaskCompletion(task)
  }

  const handleDelete = () => {
    deleteTask(task.key)
  }

  const handleKeyDown = e => {
    const keys = ['Enter', 'NumpadEnter', 'Escape']
    if (keys.includes(e.code)) {
      e.preventDefault()
      e.target.blur()
    }
  }

  const handleBlur = () => {
    const trimmedValue = task.value.trim()
    if (trimmedValue === '') {
      deleteTask(task.key)
      return
    }
    if (task.value !== trimmedValue) {
      updateTask(task.key, trimmedValue)
    }
  }
  return (
    <ListItem sx={{ p: 0 }}>
      <Checkbox
        size='small'
        color='success'
        checked={task.completed}
        onChange={handleCheckboxChange}
      />

      <TextareaAutosize
        ref={!task.value ? focusedTextareaRef : null}
        className={styles.textarea}
        value={task.value}
        onChange={handleTextChange}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
      />

      <IconButton
        aria-label='delete'
        color='error'
        size='small'
        onClick={handleDelete}
      >
        <RemoveCircleOutlineOutlined fontSize='inherit' />
      </IconButton>
    </ListItem>
  )
}
