import React, { useState, useContext } from "react"
import {
  TextField,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Dialog,
  Grid
} from "@material-ui/core"
import { taskContext } from "../context/taskContext"

const TaskForm = ({ open, handleClose }) => {
  const { addTask } = useContext(taskContext)

  const [task, setTask] = useState({
    title: "",
    expTime: "",
    description: "",
    status: false
  })

  const handleInput = name => event =>
    setTask({ ...task, [name]: event.target.value })

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Create a new activity</DialogTitle>
      <DialogContent>
        <Grid container component="form" spacing={2}>
          <Grid item sm={6} xs={12}>
            <TextField
              name="title"
              type="text"
              variant="outlined"
              size="small"
              placeholder="Activity Title"
              value={task.title}
              onChange={handleInput("title")}
            />
          </Grid>
          <Grid item sm={6} xs={12}>
            <TextField
              name="expTime"
              type="text"
              variant="outlined"
              size="small"
              placeholder="Time or Date of Activity"
              value={task.expTime}
              onChange={handleInput("expTime")}
            />
          </Grid>
          <Grid item xs>
            <TextField
              name="description"
              type="text"
              variant="outlined"
              size="small"
              placeholder="Description"
              value={task.description}
              onChange={handleInput("description")}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={handleClose}>
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          autoFocus
          onClick={() => {
            addTask(task)
            handleClose()
          }}
          disabled={!task.title || !task.expTime}
        >
          Done
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default TaskForm
