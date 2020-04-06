import React, { useState, useContext } from "react"
import TextField from "@material-ui/core/TextField"
import DialogTitle from "@material-ui/core/DialogTitle"
import DialogContent from "@material-ui/core/DialogContent"
import DialogActions from "@material-ui/core/DialogActions"
import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import Grid from "@material-ui/core/Grid"
import PickDateAndTime from "./PickDateAndTime"
import { taskContext } from "../context/taskContext"

const TaskForm = ({ open, handleClose }) => {
  const { addTask } = useContext(taskContext)

  const [task, setTask] = useState({
    title: "",
    expTime: new Date(new Date().toISOString()),
    description: "",
    status: false
  })

  const handleInput = name => event =>
    setTask({ ...task, [name]: event.target.value })

  const handleDateTimeChange = date =>
    setTask({ ...task, expTime: new Date(date).toUTCString() })

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Create a new activity</DialogTitle>
      <DialogContent>
        <Grid container component="form" spacing={2}>
          <Grid item xs={12}>
            <TextField
              name="title"
              type="text"
              variant="outlined"
              size="small"
              placeholder="Activity Title"
              value={task.title}
              onChange={handleInput("title")}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="description"
              type="text"
              variant="outlined"
              size="small"
              placeholder="Description"
              value={task.description}
              onChange={handleInput("description")}
              fullWidth
              multiline
              rows="4"
            />
          </Grid>
          <Grid item xs>
            <PickDateAndTime
              date={task.expTime}
              handleDateTimeChange={handleDateTimeChange}
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
