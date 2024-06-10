import { Button } from '@mui/material'
import { Add } from '@mui/icons-material'

export default function AddTaskButton({ addTask }) {
  return (
    <Button
      variant='outlined'
      color='success'
      fullWidth
      size='large'
      onClick={addTask}
    >
      <Add />
    </Button>
  )
}
